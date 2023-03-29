import { API } from "./api.generated"
import { $$ as icreateCodeCompletionsGenerator } from "./implementations/createCodeCompletionsGenerator.a.c"
import { $$ as icreateHoverTextsGenerator } from "./implementations/createHoverTextsGenerator.a.c"
import { $$ as icreateLocationFilter } from "./implementations/createLocationFilter.a.c"

export const $api: API = {
    'createCodeCompletionsGenerator': icreateCodeCompletionsGenerator,
    'createHoverTextsGenerator': icreateHoverTextsGenerator,
    'createLocationFilter': icreateLocationFilter,
}