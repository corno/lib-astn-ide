import * as pt from 'pareto-core-types'

import { T   } from './types.generated'

import * as gcommon from "glo-pareto-common"

export type ICallback = {
    'callback': ($: gcommon.T.String, ) => void
}

export type IOnToken = ($: T.Token, ) => void

export type FCreateCodeCompletionsGenerator = ($: T.Location, $i: ICallback,) => gtth.ITypedHandler

export type FCreateHoverTextsGenerator = ($: gcommon.T.Null,) => void