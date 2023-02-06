import * as pt from 'pareto-core-types'

import * as t from './types.generated'

import * as mcommon from "glo-pareto-common"

export type ICallback = {
    'callback': ($: mcommon.TString, ) => void
}

export type FCreateCodeCompletionFinder = ($: TLocation, $i: ICallback,) => mtth.ITypedHandler