import * as pt from 'pareto-core-types'

import { T   } from './types.generated'

import * as mcommon from "glo-pareto-common"

export type ICallback = {
    'callback': ($: mcommon.T.String, ) => void
}

export type IOnToken = ($: T.Token, ) => void

export type FCreateCodeCompletionsGenerator = ($: T.Location, $i: ICallback,) => mtth.ITypedHandler

export type FCreateHoverTextsGenerator = ($: mcommon.T.Null,) => void