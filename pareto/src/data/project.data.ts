import * as pd from 'pareto-core-data'

import * as mproject from "lib-pareto-typescript-project/dist/submodules/project"

const d = pd.d

import { $ as main } from "./main/module.data"
import { $ as private_ } from "./submodules/private/module.data"

export const $: mproject.T.Project<pd.SourceLocation> = {
    'author': "Corno",
    'description': "functions that can be used by an IDE to support ASTN",
    'license': "TBD",

    'dependencies': d({
        "glo-pareto-common": null,
    }),
    'type': ['library', {
        'main': main,
        'submodules': d({
            "private": private_,
        }),
        'executables': d({}),
        'test': {
            'dependencies': d({
                "lib-astn-dummyhandlers": null,
            }),
            'glossary': {
                'functions': d({}),
                'parameters': d({}),
                'types': d({}),
                'interfaces': d({}),
            },
            'imports': d({}),
        }
    }],
}