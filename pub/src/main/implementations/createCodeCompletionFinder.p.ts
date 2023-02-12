import * as pt from 'pareto-core-types'
import * as pl from 'pareto-core-lib'

import { createCodeCompletionsGenerator } from "../private/createCodeCompletionsGenerator.p"
import { isPositionBeforeLocation } from "../private/isPositionBeforeLocation.p"
import * as api from "../../interface"

export const createCodeCompletionFinder: api.CreateCodeCompletionFinder = (
    $, $i, $d
) => {

    let positionAlreadyFound = false
    let previousAfter: null | (() => pt.Array<string>) = null
    function generate(gs: (() => pt.Array<string>) | null) {
        if (gs !== null) {
            const codeCompletions = gs()
            codeCompletions.forEach((codeCompletion) => {
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
            $d.x,
        ),
        onEnd: () => {
            if (!positionAlreadyFound) {
                generate(previousAfter)
            }

        }
    }
}
