import * as pt from 'pareto-core-types'

import * as glo from "./glossary"

import * as mcommon from "glo-pareto-common"

export type CcreateCodeCompletionsFinder = glo.FCreateCodeCompletionsFinder

export type CcreateHoverTextsFinder = glo.FCreateHoverTextsFinder

export type API = {
    createCodeCompletionsFinder: CcreateCodeCompletionsFinder
    createHoverTextsFinder: CcreateHoverTextsFinder
}