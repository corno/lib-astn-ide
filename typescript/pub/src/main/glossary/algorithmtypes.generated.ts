import * as pt from 'pareto-core-types'

import { T } from "./datatypes.generated"

import * as g_common from "glo-pareto-common"
import * as g_th from "glo-astn-typedhandlers"

export namespace ASYNC {
    
    export namespace I {
        
        export type CodeCompletionHandler<GAnnotation> = {
            'data': ($: T.CodeCompletion<GAnnotation>, ) => void
            'end': () => void
        }
        
        export type CreateLocationFilter2<GAnnotation> = ($: T.LocationData<GAnnotation>, ) => g_th.ASYNC.I.RootHandler<T.Annotation<GAnnotation>>
        
        export type HoverTextHandler<GAnnotation> = {
            'data': ($: T.HoverText<GAnnotation>, ) => void
            'end': () => void
        }
    }
    
    export namespace A {
        
        
        export namespace C {
            export type CreateCodeCompletionsGenerator<GAnnotation> = ($is: {
                readonly 'handler': ASYNC.I.CodeCompletionHandler<GAnnotation>
            }) => g_th.ASYNC.I.ValueHandler<T.Annotation<GAnnotation>>
        }
        
        
        export namespace C {
            export type CreateHoverTextsGenerator<GAnnotation> = ($is: {
                readonly 'handler': ASYNC.I.HoverTextHandler<GAnnotation>
            }) => g_th.ASYNC.I.RootHandler<T.Annotation<GAnnotation>>
        }
        
        
        export namespace C {
            export type CreateLocationFilter<GAnnotation> = ($is: {
                readonly 'handler': g_th.ASYNC.I.ValueHandler<T.Annotation<GAnnotation>>
            }) => ASYNC.I.CreateLocationFilter2<GAnnotation>
        }
    }
}

export namespace SYNC {}