import * as pt from 'pareto-core-types'

import * as gcommon from "glo-pareto-common"
import * as gthis from "./glossary"

export type CcreateCodeCompletionsGenerator = gthis.FCreateCodeCompletionFinder

export type CcreateHoverTextsGenerator = gthis.FCreateHoverTextsFinder

export type API = {
    createCodeCompletionsGenerator: CcreateCodeCompletionsGenerator
    createHoverTextsGenerator: CcreateHoverTextsGenerator
}