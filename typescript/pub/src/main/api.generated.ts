import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"
import * as g_this from "./glossary"

export namespace D {
    
    
    
}

export namespace A {
    
    export type createCodeCompletionsGenerator = <GAnnotation>() => g_this.ASYNC.A.C.CreateCodeCompletionsGenerator<GAnnotation>
    
    export type createHoverTextsGenerator = <GAnnotation>() => g_this.ASYNC.A.C.CreateHoverTextsGenerator<GAnnotation>
    
    export type createLocationFilter = <GAnnotation>() => g_this.ASYNC.A.C.CreateLocationFilter<GAnnotation>
}

export type API = {
    readonly 'createCodeCompletionsGenerator': A.createCodeCompletionsGenerator
    readonly 'createHoverTextsGenerator': A.createHoverTextsGenerator
    readonly 'createLocationFilter': A.createLocationFilter
}