import * as pd from 'pareto-core-data'

import {
    null_,
    array,
    string,
    reference,
    boolean,
    nested,
    typeReference,
    dictionary, group, member, taggedUnion, types, func, data
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands.p"

import { definitionReference, constructor, algorithm } from "lib-pareto-typescript-project/dist/submodules/moduleDefinition/shorthands.p"

import * as mmoduleDefinition from "lib-pareto-typescript-project/dist/submodules/moduleDefinition"

import { $ as glossary } from "./glossary.data"

const d = pd.wrapRawDictionary

export const $: mmoduleDefinition.T.ModuleDefinition = {
    'glossary': glossary,
    'api': {
        'imports': d({
            "common": "glo-pareto-common",
        }),
        'algorithms': d({
            "createCodeCompletionsFinder": algorithm(definitionReference("CreateCodeCompletionsFinder")),

            // readonly "getStartLocation": ($: PAnnotation) => TLocation
            // readonly "getEndLocation": ($: PAnnotation) => TLocation
            // readonly x: DX
            "createHoverTextsFinder": algorithm(definitionReference("CreateHoverTextsFinder")),
        })
    },
}