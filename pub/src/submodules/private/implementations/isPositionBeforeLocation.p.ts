
import * as api from "../../interface"


export function isPositionBeforeLocation($: {
    readonly "position": api.TLocation
    readonly "location": api.TLocation
}): boolean {
    return $.position.line < $.location.line
        || (
            $.position.line === $.location.line
            && $.position.column < $.location.column
        )
}