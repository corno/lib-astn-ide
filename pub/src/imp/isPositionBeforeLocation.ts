import { Location } from "../interface"



export function isPositionBeforeLocation($: {
    position: Location
    location: Location
}): boolean {
    return $.position.line < $.location.line
        || (
            $.position.line === $.location.line
            && $.position.column < $.location.column
        )
}