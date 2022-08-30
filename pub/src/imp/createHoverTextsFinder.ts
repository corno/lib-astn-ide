import { isPositionBeforeLocation } from "./isPositionBeforeLocation"
import * as tth from "api-astn-typedhandlers"
import { createHoverTextsGenerator } from "./createHoverTextsGenerator"
import * as api from "../interface"

export const createHoverTextsFinder: api.CreateHoverTextsFinder = (
    $, $i, $d,
) => {
    return createHoverTextsGenerator(
        {
            onToken: (annotation, getHoverText) => {
                //console.log("LOCATION", range.start.line, range.start.column, range.end.line, range.end.column)

                if (!isPositionBeforeLocation({
                    position: $.position,
                    location: $d.getStartLocation(annotation),
                })) {
                    if (isPositionBeforeLocation({
                        position: $.position,
                        location: $d.getEndLocation(annotation),
                    })) {
                        if (getHoverText !== null) {
                            $i.callback(getHoverText())
                        }
                    }
                }
            }
        }
    )
}
