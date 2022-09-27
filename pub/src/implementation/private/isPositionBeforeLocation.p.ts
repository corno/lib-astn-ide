
import * as api from "../../interface"


export function isPositionBeforeLocation($: {
    position: api.TLocation
    location: api.TLocation
}): boolean {
    return $.position.line < $.location.line
        || (
            $.position.line === $.location.line
            && $.position.column < $.location.column
        )
}