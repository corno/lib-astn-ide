import { isPositionBeforeLocation } from "../private/isPositionBeforeLocation.p"
import { createHoverTextsGenerator } from "../private/createHoverTextsGenerator.p"

import { A } from "../api.generated"

export const $$: A.createHoverTextsFinder = (
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
