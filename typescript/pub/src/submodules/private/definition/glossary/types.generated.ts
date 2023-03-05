import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"

export namespace T {
    
    export namespace Token {
        
        export type annotation = GAnnotation
        
        export namespace getCodeCompletionsAfter {
            
            export namespace O {
                
                export namespace C {
                    
                    export type A = string
                }
                
                export type C = pt.Array<string>
            }
            
            export type O = () => pt.Array<string>
        }
        
        export type getCodeCompletionsAfter = [ false ] | [ true, () => pt.Array<string>]
        
        export namespace getCodeCompletionsIn {
            
            export namespace O {
                
                export namespace C {
                    
                    export type A = string
                }
                
                export type C = pt.Array<string>
            }
            
            export type O = () => pt.Array<string>
        }
        
        export type getCodeCompletionsIn = [ false ] | [ true, () => pt.Array<string>]
    }
    
    export type Token = {
        readonly 'annotation': GAnnotation
        readonly 'getCodeCompletionsAfter': [ false ] | [ true, () => pt.Array<string>]
        readonly 'getCodeCompletionsIn': [ false ] | [ true, () => pt.Array<string>]
    }
}