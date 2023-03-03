import * as pt from 'pareto-core-types'

import * as gcommon from "glo-pareto-common"
import * as gthis from "./glossary"

export type CcreateCodeCompletionsFinder = gthis.FCreateCodeCompletionsFinder

export type CcreateHoverTextsFinder = gthis.FCreateHoverTextsFinder

export type API = {
    createCodeCompletionsFinder: CcreateCodeCompletionsFinder
    createHoverTextsFinder: CcreateHoverTextsFinder
}