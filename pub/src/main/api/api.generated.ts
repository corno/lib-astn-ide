import * as pt from 'pareto-core-types'

import * as gglo from "./glossary"

import * as gcommon from "glo-pareto-common"

export type CcreateCodeCompletionsFinder = gglo.FCreateCodeCompletionsFinder

export type CcreateHoverTextsFinder = gglo.FCreateHoverTextsFinder

export type API = {
    createCodeCompletionsFinder: CcreateCodeCompletionsFinder
    createHoverTextsFinder: CcreateHoverTextsFinder
}