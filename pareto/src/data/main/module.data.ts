import * as pd from 'pareto-core-data'

import { external, this_ } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"

import { $ as api } from "./api.data"
import { $ as glossary } from "./glossary.data"

const d = pd.d

export const $: g_project.T.Module<pd.SourceLocation> = {
    'definition': {
        'glossary': {
            'root': glossary,
            'imports': d({
                "common": external("glo-pareto-common"),
                "th": external("glo-astn-typedhandlers"),
            }),
        },
        'api': {
            'root': api,
            'imports': d({
                "common": external("glo-pareto-common"),
                "this": this_(),
            }),
        }
    },
    'implementation': ['typescript', null],
}