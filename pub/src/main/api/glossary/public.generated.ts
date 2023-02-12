import * as pt from 'pareto-core-types'

import { T   } from './types.generated'

import * as mcommon from "glo-pareto-common"

export type ICallback = {
    'callback': ($: mcommon.T.String, ) => void
}

export type FCreateCodeCompletionsFinder = ($: T.Location, $i: ICallback,) => mtth.ITypedHandler

export type FCreateHoverTextsFinder = ($: mcommon.T.Null,) => void