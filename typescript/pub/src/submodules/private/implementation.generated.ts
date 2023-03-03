import { API } from "./definition/api.generated"
import { $$ as icreateCodeCompletionsGenerator } from "./implementations/createCodeCompletionsGenerator.p"
import { $$ as icreateHoverTextsGenerator } from "./implementations/createHoverTextsGenerator.p"

export const $a: API = {
    'createCodeCompletionsGenerator': icreateCodeCompletionsGenerator,
    'createHoverTextsGenerator': icreateHoverTextsGenerator,
}