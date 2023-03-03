
import * as api from "../api"


export const $$: api.CisPostionBeforeLocation = ($
    // readonly "position": api.TLocation
    // readonly "location": api.TLocation
) => {
    return $.position.line < $.location.line
        || (
            $.position.line === $.location.line
            && $.position.column < $.location.column
        )
}