import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"
import * as g_this from "./glossary"

export type createCodeCompletionsFinder = g_this.F.CreateCodeCompletionsFinder

export type createHoverTextsFinder = g_this.F.CreateHoverTextsFinder

export type API = {
    createCodeCompletionsFinder: createCodeCompletionsFinder
    createHoverTextsFinder: createHoverTextsFinder
}