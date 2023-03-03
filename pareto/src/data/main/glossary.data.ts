import * as pd from 'pareto-core-data'

import {
    null_,
    array,
    string,
    reference,
    boolean,
    typeReference,
    dictionary, group, member, taggedUnion, types, func, data, interfaceReference, inf, method
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as mglossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pd.d

export const $: mglossary.T.Glossary<string> = {
    'parameters': d({}),
    'types': d({
        //"Location": 

        // export type CreateCodeCompletionFinder = <PAnnotation>(
        //     $: {
        //         readonly "completionPosition": TLocation,
        //     },
        //     $i: {
        //         readonly "callback": ($: string) => void,
        //     },
        //     $d: DCreateCodeCompletionFinder<PAnnotation>
        // ) => tth.ITypedHandler<PAnnotation>
        
        
        // export type FCreateHoverTextsFinder = <PAnnotation>(
        //     $: {
        //         readonly "position": TLocation, //the line and character where the hover is requested
        //     },
        //     $i: {
        //         readonly "callback": ($: string) => void,
        //     },
        //     $d: DCreateCodeCompletionFinder<PAnnotation>
        // ) => tth.ITypedHandler<PAnnotation> 
    }),
    'interfaces': d({
        "Callback": ['group', {
            'members': d({
                "callback": method(typeReference("common", "String"))
            }),
        }],
    }),
    'functions': d({
        "CreateCodeCompletionsFinder": func(typeReference("Location"), null, interfaceReference("Callback"), inf(interfaceReference( "tth", "TypedHandler"))),
        "CreateHoverTextsFinder": func(typeReference("common", "Null"), null, null, null),
    }),
}