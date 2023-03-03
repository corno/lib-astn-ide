import { API } from "./definition/api.generated"
import { $$ as icreateCodeCompletionsFinder } from "./implementations/createCodeCompletionsFinder.p"
import { $$ as icreateHoverTextsFinder } from "./implementations/createHoverTextsFinder.p"

export const $a: API = {
    'createCodeCompletionsFinder': icreateCodeCompletionsFinder,
    'createHoverTextsFinder': icreateHoverTextsFinder,
}