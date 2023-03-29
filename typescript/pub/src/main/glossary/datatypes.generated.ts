import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"
import * as g_th from "glo-astn-typedhandlers"

export namespace N {}

export namespace T {
    
    export type Annotation<GAnnotation> = GAnnotation
    
    export namespace CodeCompletion {
        
        export type text<GAnnotation> = string
    }
    
    export type CodeCompletion<GAnnotation> = {
        readonly 'text': string
    }
    
    export namespace HoverText {
        
        export type text<GAnnotation> = string
    }
    
    export type HoverText<GAnnotation> = {
        readonly 'text': string
    }
    
    export namespace LocationData {
        
        export type text<GAnnotation> = string
    }
    
    export type LocationData<GAnnotation> = {
        readonly 'text': string
    }
}