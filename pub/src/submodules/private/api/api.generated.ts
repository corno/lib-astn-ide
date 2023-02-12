import * as pt from 'pareto-core-types'

import * as glo from "./glossary"

import * as mcommon from "glo-pareto-common"

export type CcreateCodeCompletionsGenerator = glo.FCreateCodeCompletionFinder

export type CcreateHoverTextsGenerator = glo.FCreateHoverTextsFinder

export type API = {
    createCodeCompletionsGenerator: CcreateCodeCompletionsGenerator
    createHoverTextsGenerator: CcreateHoverTextsGenerator
}