import * as pr from 'pareto-core-raw'

import * as mproject from "lib-pareto-typescript-project/dist/submodules/project"

const d = pr.wrapRawDictionary

import { $ as api } from "./api.data"
import { $ as private_ } from "./submodules/private/api.data"

export const $: mproject.T.Project = {
    'author': "Corno",
    'description': "functions that can be used by an IDE to support ASTN",
    'license': "ISC",

    'dependencies': d({
        "glo-pareto-common": {},
    }),
    'type': ['library', {
        'main': {
            'definition': api,
        },
        'submodules': d({
            "private": {
                'definition': private_,
            }
        }),
        'executables': d({}),
        'test': {
            'dependencies': d({
                "lib-astn-dummyhandlers": {},
            }),
            'glossary': {
                'functions': d({}),
                'imports': d({}),
                'parameters': d({}),
                'types': d({}),
                'interfaces': d({}),
            },
        }
    }],
}