import * as pt from "pareto-core-types"
import * as pl from "pareto-core-lib"
import * as pw from "pareto-core-raw"

import { createCodeCompletionsGenerator } from "./createCodeCompletionsGenerator"
import { isPositionBeforeLocation } from "./isPositionBeforeLocation"
import * as api from "../interface"

export const createCodeCompletionFinder: api.CreateCodeCompletionFinder = (
    $, $i, $d
) => {

    let positionAlreadyFound = false
    let previousAfter: null | (() => string[]) = null
    function generate(gs: (() => string[]) | null) {
        if (gs !== null) {
            const codeCompletions = gs()
            pw.wrapRawArray(codeCompletions).forEach((codeCompletion) => {
                $i.callback(codeCompletion)
            })
        }
    }

    return {
        root: createCodeCompletionsGenerator(
            {
                onToken: (annotation, intra, after) => {
                    if (!positionAlreadyFound) {
                        if (isPositionBeforeLocation({
                            position: $.completionPosition,
                            location: $d.getStartLocation(annotation),
                        })) {
                            generate(previousAfter)
                            positionAlreadyFound = true
                        } else if (isPositionBeforeLocation({
                            position: $.completionPosition,
                            location: $d.getEndLocation(annotation),
                        })) {
                            generate(intra)
                            positionAlreadyFound = true

                        } else {
                            previousAfter = after
                        }
                    }
                },
            },
            {
                serializeString: $d.serializeString,
                push: $d.push,
                getArrayLength: $d.getArrayLength,
                getElement: $d.getElement,
            }
        ),
        onEnd: () => {
            if (!positionAlreadyFound) {
                generate(previousAfter)
            }

        }
    }
}
