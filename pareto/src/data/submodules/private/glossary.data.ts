import * as pd from 'pareto-core-data'

import {
    null_,
    array,
    string,
    reference,
    boolean,
    typeReference,
    dictionary, group, member, taggedUnion, types, func, data, interfaceReference, inf, method, glossaryParameter, computed, optional, type
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands.p"

import * as mglossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pd.wrapRawDictionary

export const $: mglossary.T.Glossary<string> = {
    'imports': d({
        "common": "glo-pareto-common",
    }),
    'parameters': d({}),
    'types': d({
        "Token": type(group({
            "annotation": member(glossaryParameter("Annotation")),
            "getCodeCompletionsIn": member(optional(computed(array(string())))),
            "getCodeCompletionsAfter": member(optional(computed(array(string())))),
        })),
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
        "OnToken": method(typeReference("Token")),

        // type IOnToken<PAnnotation> = (
        //     annotation: PAnnotation,
        //     getCodeCompletionsInToken: FGetCodeCompletions | null,
        //     getCodeCompletionsAfterToken: FGetCodeCompletions | null,
        // ) => void

        // export function createCodeCompletionsGenerator<PAnnotation>(
        //     $i: {
        //         onToken: IOnToken<PAnnotation>,
        //     },
        //     $d: DX
    }),
    'functions': d({
        "CreateCodeCompletionsGenerator": func(typeReference("Location"), null, interfaceReference("Callback"), inf(interfaceReference("tth", "TypedHandler"))),
        "CreateHoverTextsGenerator": func(typeReference("common", "Null"), null, null, null),
    }),
}