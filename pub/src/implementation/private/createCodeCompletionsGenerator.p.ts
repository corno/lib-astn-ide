
import * as pl from "pareto-core-lib"
import * as pt from "pareto-core-types"
import * as pw from "pareto-core-raw"

import * as tth from "api-astn-typedhandlers"
import h from "api-astn-handlers"
import { DX } from "../../interface"

type GetCodeCompletions = () => string[]


type OnToken<PAnnotation> = (
    annotation: PAnnotation,
    getCodeCompletionsInToken: GetCodeCompletions | null,
    getCodeCompletionsAfterToken: GetCodeCompletions | null,
) => void

export function createCodeCompletionsGenerator<PAnnotation>(
    $i: {
        onToken: OnToken<PAnnotation>,
    },
    $d: DX

): tth.ITypedValueHandler<PAnnotation> {
    interface IAlternativesRoot {
        root: ILine
        serialize: () => string[]
    }

    interface IStep {
        addOption: () => ILine
    }

    interface IBlock {
        addLine: () => ILine
    }

    interface ILine {
        snippet(str: string): void
        indent(callback: ($: IBlock) => void): void
        addTaggedUnionStep: () => IStep
    }

    function createCodeCompletionForValue(
        value: tth.ValueDefinition,
        sequence: ILine,
        onTaggedUnion: (def: tth.TaggedUnionDefinition) => void,
        onGroup: (def: tth.GroupDefinition) => void,
    ): void {
        switch (value.type[0]) {
            case "dictionary": {
                sequence.snippet(` { }`)
                break
            }
            case "list": {
                sequence.snippet(` [ ]`)
                break
            }
            case "type reference": {
                const $ = value.type[1]
                createCodeCompletionForValue(
                    $.type.get().value,
                    sequence,
                    onTaggedUnion,
                    onGroup
                )
                break
            }
            case "tagged union": {
                const $ = value.type[1]
                onTaggedUnion($)
                break
            }
            case "simple string": {
                const $ = value.type[1]
                if ($.quoted) {
                    sequence.snippet(` "${$["default value"]}"`)
                } else {
                    sequence.snippet(` ${$["default value"]}`)
                }
                break
            }
            case "multiline string": {
                sequence.snippet(` \`\``)
                break
            }
            case "group": {
                const $ = value.type[1]
                onGroup($)
                break
            }
            default:
                pl.au(value.type[0])
        }
    }

    function createCodeCompletionForShorthandValue(
        definition: tth.ValueDefinition,
        sequence: ILine,
    ): void {
        createCodeCompletionForValue(
            definition,
            sequence,
            ($) => {
                const step = sequence.addTaggedUnionStep()
                $.options.forEach(() => false, (option, key) => {
                    const seq = step.addOption()
                    seq.snippet(` '${key}'`)
                    createCodeCompletionForShorthandValue(option.value, seq)
                })
            },
            ($) => {
                createCodeCompletionForShorthandGroup($, sequence)
            },
        )
    }

    function createCodeCompletionForShorthandGroup(
        group: tth.GroupDefinition,
        sequence: ILine,
    ): void {
        group.properties.forEach(() => false, (prop, key) => {
            createCodeCompletionForShorthandValue(
                prop.value,
                sequence,
            )
        })
    }

    function createCodeCompletionsForTaggedUnion(
        $: tth.TaggedUnionDefinition,
        sequence: ILine,
    ): void {
        sequence.snippet(` '${$["default option"].name}'`)
        createCodeCompletionsForValue(
            $["default option"].get().value,
            sequence
        )
    }

    function createCodeCompletionForVerboseValue(prop: tth.ValueDefinition, sequence: ILine): void {
        createCodeCompletionForValue(
            prop,
            sequence,
            ($) => {
                sequence.snippet(` | '${$["default option"].name}'`)
                createCodeCompletionForVerboseValue($["default option"].get().value, sequence)
            },
            ($) => {
                sequence.snippet(` (`)
                createCodeCompletionForVerboseProperties($, sequence)
                sequence.snippet(`)`)
            },
        )
    }

    function createCodeCompletionForVerboseProperties(
        group: tth.GroupDefinition,
        sequence: ILine,
    ): void {
        let dirty = false
        sequence.indent(($) => {
            group.properties.forEach(() => false, (prop, key) => {
                dirty = true
                const line = $.addLine()
                line.snippet(`'${key}':`)
                createCodeCompletionForVerboseValue(prop.value, line)
            })
        })
        if (!dirty) {
            sequence.snippet(' ')
        }
    }

    function createAlternativesRoot(): IAlternativesRoot {
        type StepType =
            | ["block", {
                block: ABlock
            }]
            | ["snippet", {
                value: string
            }]
            | ["tagged union", {
                "alts": ASequence[]
            }]
        type ASequence = StepType[]

        type ABlock = {
            lines: ASequence[]
        }

        const rootSequence: ASequence = []

        function createBlock(imp: ABlock): IBlock {
            return {
                addLine: () => {
                    const seq: ASequence = []
                    $d.push({
                        array: imp.lines,
                        element: seq,
                    })
                    return createSequence(seq)
                },
            }
        }

        function createSequence(imp: ASequence): ILine {
            return {
                indent: (callback) => {
                    const block: ABlock = {
                        lines: [],
                    }
                    $d.push({
                        array: imp,
                        element: ["block", {
                            block: block,
                        }]
                    })
                    callback(createBlock(block))
                },
                snippet: (str: string) => {
                    $d.push({
                        array: imp,
                        element: ["snippet", { value: str }]
                    })
                },
                addTaggedUnionStep: () => {
                    function createStep(sequence: ASequence): IStep {
                        const alts: ASequence[] = []
                        $d.push({
                            array: sequence,
                            element: ["tagged union", { alts: alts }]
                        })
                        return {
                            addOption: () => {
                                const subSeq: ASequence = []
                                $d.push({
                                    array: alts,
                                    element: subSeq
                                })
                                return createSequence(subSeq)
                            },
                        }
                    }
                    return createStep(imp)
                },
            }
        }

        return {
            root: createSequence(rootSequence),
            serialize: () => {
                let indentationLevel = 0
                function createIndentation() {
                    let str = ""
                    for (let i = 0; i !== indentationLevel; i += 1) {
                        str += "    "
                    }
                    return str
                }
                function ser(
                    $: {
                        seed: string[],
                        s: ASequence,
                    },
                    $i: {
                        add: (str: string) => void,
                    }
                ): void {
                    let out = $.seed
                    for (let i = 0; i !== $d.getArrayLength($.s); i += 1) {
                        const step = $d.getElement({
                            array: $.s,
                            position: i
                        })
                        switch (step[0]) {
                            case "block":
                                pl.cc(step[1], (step2) => {
                                    indentationLevel += 1
                                    pw.wrapRawArray(step2.block.lines).forEach((l) => {
                                        const temp: string[] = []
                                        ser(
                                            {
                                                seed: pw.wrapRawArray(out).map((str) => `${str}\n${createIndentation()}`),
                                                s: l,
                                            },
                                            {
                                                add: ($) => $d.push({
                                                    array: temp,
                                                    element: $
                                                })
                                            }
                                        )
                                        out = temp
                                    })
                                    indentationLevel -= 1
                                    if ($d.getArrayLength(step2.block.lines) !== 0) {
                                        out = pw.wrapRawArray(out).map((str) => `${str}\n${createIndentation()}`)
                                    }
                                })
                                break
                            case "snippet":
                                pl.cc(step[1], (step2) => {
                                    out = pw.wrapRawArray(out).map((str) => {
                                        return str + step2.value
                                    })
                                })
                                break
                            case "tagged union":
                                pl.cc(step[1], (step2) => {
                                    const temp: string[] = []
                                    for (let j = 0; j !== $d.getArrayLength(step2.alts); j += 1) {
                                        const alt = $d.getElement({
                                            array: step2.alts,
                                            position: j,
                                        })
                                        ser(
                                            {
                                                seed: out,
                                                s: alt,
                                            },
                                            {
                                                add: ($) => $d.push({
                                                    array: temp,
                                                    element: $
                                                })
                                            }

                                        )
                                    }
                                    out = temp
                                })
                                break
                            default:
                                pl.au(step[0])
                        }
                    }

                    pw.wrapRawArray(out).forEach((str) => {
                        $i.add(str)
                    })
                }
                const res: string[] = []
                ser(
                    {
                        seed: [""],
                        s: rootSequence,
                    },
                    {
                        add: ($) => $d.push({
                            array: res,
                            element: $
                        })
                    }
                )
                return res
            },
        }
    }

    function createCodeCompletionsForValue(
        definition: tth.ValueDefinition,
        line: ILine,
    ): void {
        createCodeCompletionForValue(
            definition,
            line,
            ($) => {
                line.snippet(` |`)
                createCodeCompletionsForTaggedUnion(
                    $,
                    line,
                )
            },
            ($) => {
                const tus = line.addTaggedUnionStep()
                const verbose = tus.addOption()
                verbose.snippet(` (`)
                createCodeCompletionForVerboseProperties(
                    $,
                    verbose,
                )
                verbose.snippet(`)`)

                const shorthand = tus.addOption()
                shorthand.snippet(` <`)
                createCodeCompletionForShorthandGroup(
                    $,
                    shorthand,
                )
                shorthand.snippet(` >`)
            }
        )
    }

    function createValueHandler(
    ): tth.ITypedValueHandler<PAnnotation> {
        function ifToken<Data>(
            token: h.AnnotatedToken<Data, PAnnotation> | null,
            inToken: GetCodeCompletions | null,
            afterToken: GetCodeCompletions | null,
        ) {
            if (token === null) {
                return
            }
            $i.onToken(
                token.annotation,
                inToken,
                afterToken,
            )
        }
        function addDummyOnToken<Data>(token: h.AnnotatedToken<Data, PAnnotation> | null) {
            ifToken(
                token,
                null,
                null,
            )
        }

        function doGroup(
            annotation: PAnnotation | null,
            alternatives: string[],
        ): tth.IGroupHandler<PAnnotation> {
            if (annotation !== null) {
                $i.onToken(
                    annotation,
                    null,
                    () => {
                        return alternatives
                    },
                )

            }
            return {
                onProperty: ($) => {
                    ifToken(
                        $.token,
                        null,
                        () => {
                            const propAlts = createAlternativesRoot()
                            createCodeCompletionsForValue(
                                $.definition,
                                propAlts.root,
                            )
                            return propAlts.serialize()
                        }
                    )
                    return createValueHandler()
                },
                onUnexpectedProperty: ($) => {
                    $i.onToken(
                        $.token.annotation,
                        () => {
                            return $.expectedProperties
                        },
                        null,
                    )
                },
                onClose: ($$) => {
                    ifToken(
                        $$.token,
                        () => {
                            return alternatives
                        },
                        null,
                    )
                },
            }
        }

        return {
            onDictionary: ($) => {
                addDummyOnToken($.token)
                return {
                    onClose: ($) => {
                        addDummyOnToken($.token)
                    },
                    onEntry: ($$) => {
                        ifToken(
                            $$.token,
                            null,
                            () => {
                                const entryAlts = createAlternativesRoot()
                                createCodeCompletionsForValue(
                                    $.definition.value,
                                    entryAlts.root,
                                )
                                return entryAlts.serialize()
                            }
                        )
                        return createValueHandler()
                    },
                }
            },
            onList: ($) => {
                addDummyOnToken($.token)
                return {
                    onClose: ($) => {
                        addDummyOnToken($.token)
                    },
                    onElement: () => {
                        return createValueHandler()
                    },
                }
            },
            onTaggedUnion: ($) => {
                ifToken(
                    $.token,
                    null,
                    () => {
                        const alternatives = createAlternativesRoot()
                        createCodeCompletionsForTaggedUnion(
                            $.definition,
                            alternatives.root,
                        )
                        return alternatives.serialize()
                    }
                )
                return {
                    onUnexpectedOption: ($$) => {
                        $i.onToken(
                            $$.token.annotation,
                            () => {
                                return $$.expectedOptions
                            },
                            null,
                        )
                        return createValueHandler()
                    },
                    onOption: ($$) => {
                        addDummyOnToken($$.token)
                        return createValueHandler()
                    },
                    onEnd: () => { },
                }
            },
            onSimpleString: ($) => {
                ifToken(
                    $.token,
                    () => {

                        return [
                            $d.serializeString({
                                rawValue: $.definition["default value"],
                                quoted: $.definition.quoted
                            })
                        ]
                    },
                    // () => {
                    //     return $.getSuggestions().map(sugg => {
                    //         return $.definition.quoted ? `"${sugg}"` : sugg
                    //     })
                    // },
                    null,
                )
            },
            onMultilineString: ($) => {
                addDummyOnToken($.token)
            },
            onTypeReference: () => {
                return createValueHandler()
            },
            onGroup: ($) => {
                const definition = $.definition
                switch ($.type[0]) {
                    case "mixin":
                        return doGroup(
                            null,
                            [],
                        )
                    case "omitted":
                        return doGroup(
                            null,
                            [],
                        )
                    case "shorthand":
                        return pl.cc($.type[1], ($) => {
                            const alternatives = createAlternativesRoot()
                            createCodeCompletionForShorthandGroup(
                                definition,
                                alternatives.root,
                            )
                            return doGroup(
                                $.annotation,
                                alternatives.serialize()
                            )
                        })
                    case "verbose":
                        return pl.cc($.type[1], ($) => {
                            const alternatives = createAlternativesRoot()
                            createCodeCompletionForVerboseProperties(definition, alternatives.root)
                            return doGroup(
                                $.annotation,
                                alternatives.serialize(),
                            )
                        })
                    default:
                        return pl.au($.type[0])
                }
            },
        }
    }

    return createValueHandler()
}