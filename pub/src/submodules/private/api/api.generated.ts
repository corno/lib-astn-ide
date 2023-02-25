import * as pt from 'pareto-core-types'

import * as gglo from "./glossary"

import * as gcommon from "glo-pareto-common"

export type CcreateCodeCompletionsGenerator = gglo.FCreateCodeCompletionFinder

export type CcreateHoverTextsGenerator = gglo.FCreateHoverTextsFinder

export type API = {
    createCodeCompletionsGenerator: CcreateCodeCompletionsGenerator
    createHoverTextsGenerator: CcreateHoverTextsGenerator
}