import * as pl from "pareto-core-lib"

import * as tth from "api-astn-typedhandlers"
import * as h from "api-astn-handlers"

type GetHoverText = () => string


export type OnTokenHoverText<PAnnotation> = (
    annotation: PAnnotation,
    getHoverTexts: GetHoverText | null,
) => void

export function createHoverTextsGenerator<PAnnotation>(
    $i: {
        onToken: OnTokenHoverText<PAnnotation>
    },
): tth.ITypedHandler<PAnnotation> {

    function createValueHoverTextGenerator(
        name: string | null,
    ): tth.ITypedValueHandler<PAnnotation> {
        function addOnToken<Token>(token: h.AnnotatedToken<Token, PAnnotation> | null) {
            if (name !== null) {
                const cn = name
                if (token !== null) {
                    $i.onToken(token.annotation, () => {
                        return cn
                    })
                }
            }
        }
        return {
            onDictionary: ($) => {
                addOnToken($.token)
                return {
                    onClose: ($) => {
                        addOnToken($.token)
                    },
                    onEntry: () => {
                        return createValueHoverTextGenerator(null)
                    },
                }
            },
            onList: ($) => {
                addOnToken($.token)
                return {
                    onClose: ($) => {
                        addOnToken($.token)
                    },
                    onElement: () => {
                        return createValueHoverTextGenerator(null)
                    },
                }
            },
            onTaggedUnion: ($) => {
                addOnToken($.token)
                return {
                    onUnexpectedOption: () => {
                        return createValueHoverTextGenerator(null)
                    },
                    onOption: ($) => {
                        addOnToken($.token)
                        return createValueHoverTextGenerator(null)
                    },
                    onEnd: () => { },
                }
            },
            onSimpleString: ($) => {
                addOnToken($.token)
            },
            onMultilineString: ($) => {
                addOnToken($.token)
            },
            onTypeReference: () => {
                return createValueHoverTextGenerator(name)
            },
            onGroup: ($) => {
                switch ($.type[0]) {
                    case "mixin":
                        break
                    case "omitted":
                        break
                    case "verbose":
                        pl.cc($.type[1], ($) => {
                            addOnToken($)
                        })
                        break
                    case "shorthand":
                        pl.cc($.type[1], ($) => {
                            addOnToken($)
                        })
                        break
                    default:
                        pl.au($.type[0])
                }
                return {
                    onUnexpectedProperty: () => { },
                    onProperty: ($) => {
                        return createValueHoverTextGenerator($.key)
                    },
                    onClose: ($) => {
                        addOnToken($.token)
                    },
                }
            },
        }
    }
    return {
        root: createValueHoverTextGenerator(null),
        onEnd: () => {

        },
    }
}