import * as pr from 'pareto-core-raw'

import {
    null_,
    array,
    string,
    reference,
    boolean,
    typeReference,
    dictionary, group, member, taggedUnion, types, func, data, interfaceReference, inf, method
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands.p"

import * as mglossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pr.wrapRawDictionary

export const $: mglossary.TGlossary = {
    'imports': d({
        "common": "glo-pareto-common",
    }),
    'parameters': d({}),
    'templates': d({}),
    'types': types({
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
        "CreateCodeCompletionFinder": func(typeReference("Location"), null, interfaceReference("Callback"), inf(interfaceReference( "tth", "TypedHandler"))),
    }),
}