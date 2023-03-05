import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"
import * as g_this from "./glossary"

export type createCodeCompletionsGenerator = g_this.F.CreateCodeCompletionFinder

export type createHoverTextsGenerator = g_this.F.CreateHoverTextsFinder

export type API = {
    createCodeCompletionsGenerator: createCodeCompletionsGenerator
    createHoverTextsGenerator: createHoverTextsGenerator
}