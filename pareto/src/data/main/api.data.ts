import * as pd from 'pareto-core-data'

import { constructor, algorithm } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"
const d = pd.d

export const $: g_project.T.ModuleDefinition.api.root<pd.SourceLocation> = {
    'algorithms': d({
        // "createCodeCompletionsFinder": algorithm(afunction("this", {}, "CreateCodeCompletionsFinder")),

        // // readonly "getStartLocation": ($: PAnnotation) => TLocation
        // // readonly "getEndLocation": ($: PAnnotation) => TLocation
        // // readonly x: DX
        "createCodeCompletionsGenerator": algorithm(constructor("this", {}, "CreateCodeCompletionsGenerator"), { "Annotation": "X" }),
        "createHoverTextsGenerator": algorithm(constructor("this", {}, "CreateHoverTextsGenerator"), { "Annotation": "X" }),
        "createLocationFilter": algorithm(constructor("this", {}, "CreateLocationFilter"), { "Annotation": "X" }),
    }),
}