import { API } from "./api"
import { $$ as icreateCodeCompletionsFinder } from "./implementations/createCodeCompletionsFinder.p"
import { $$ as icreateHoverTextsFinder } from "./implementations/createHoverTextsFinder.p"

export const $a: API = {
    'createCodeCompletionsFinder': icreateCodeCompletionsFinder,
    'createHoverTextsFinder': icreateHoverTextsFinder,
}