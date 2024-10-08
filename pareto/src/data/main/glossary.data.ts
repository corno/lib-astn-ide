import * as pd from 'pareto-core-data'

import {
    aExternalInterfaceReference, aInterface, aInterfaceMethod, aInterfaceReference,
    constructor, glossaryParameter, group, imp, member, ref, streamconsumer, string, type, typeReference
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pd.d

export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
    'glossary parameters': d({
        "Annotation": null
    }),
    'imports': d({
        "th": imp(), //FIXME imp({ "Annotation": typeReference("Annotation") })
    }),
    'root': {
        'namespaces': d({}),
        'types': d({
            "Annotation": type(ref(glossaryParameter("Annotation"))),
            // "Token": type(group({
            //     "annotation": member(glossaryParameter("Annotation")),
            //     "getCodeCompletionsIn": member(optional(computed(array(string())))),
            //     "getCodeCompletionsAfter": member(optional(computed(array(string())))),
            // })),
            "HoverText": type(group({
                "text": member(string()),
            })),
            "CodeCompletion": type(group({
                "text": member(string()),
            })),
            "LocationData": type(group({
                "text": member(string()),
            }))

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
    },

    'asynchronous': {
        'interfaces': d({

            // "Callback": ['group', {
            //     'members': d({
            //         "callback": method(typeReference("common", "String")),
            //     }),
            // }],
            // "OnToken": interfaceMethod(typeReference("Token")),

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
            //"CreateHoverTextsGenerator": func(typeReference("common", "Null"), null, null, null),
            //"CreateCodeCompletionsGenerator": func(typeReference("Location"), null, interfaceReference("Callback"), inf(interfaceReference("tth", "TypedHandler"))),

            "HoverTextHandler": aInterface(streamconsumer(
                aInterfaceMethod(typeReference("HoverText")),
                aInterfaceMethod(null)
            )),
            "CodeCompletionHandler": aInterface(streamconsumer(
                aInterfaceMethod(typeReference("CodeCompletion")),
                aInterfaceMethod(null)
            )),
            "CreateLocationFilter2": aInterface(aInterfaceMethod(typeReference("LocationData"), ['reference', aExternalInterfaceReference("th", "RootHandler")])),
        }),
        'algorithms': d({
            "CreateHoverTextsGenerator": constructor(aExternalInterfaceReference("th", "RootHandler"), {
                "handler": aInterfaceReference("HoverTextHandler")
            }),
            "CreateCodeCompletionsGenerator": constructor(aExternalInterfaceReference("th", "ValueHandler"), {
                "handler": aInterfaceReference("CodeCompletionHandler")
            }),
            "CreateLocationFilter": constructor(aInterfaceReference("CreateLocationFilter2"), {
                "handler": aExternalInterfaceReference("th", "ValueHandler")
            })
        }),
    },
    'synchronous': {
        'interfaces': d({}),
        'algorithms': d({}),
    },
}

// export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
//     'parameters': d({}),
//     'imports': d({}),
//     'types': d({
//         //"Location": 

//         // export type CreateCodeCompletionFinder = <PAnnotation>(
//         //     $: {
//         //         readonly "completionPosition": TLocation,
//         //     },
//         //     $i: {
//         //         readonly "callback": ($: string) => void,
//         //     },
//         //     $d: DCreateCodeCompletionFinder<PAnnotation>
//         // ) => tth.ITypedHandler<PAnnotation>


//         // export type FCreateHoverTextsFinder = <PAnnotation>(
//         //     $: {
//         //         readonly "position": TLocation, //the line and character where the hover is requested
//         //     },
//         //     $i: {
//         //         readonly "callback": ($: string) => void,
//         //     },
//         //     $d: DCreateCodeCompletionFinder<PAnnotation>
//         // ) => tth.ITypedHandler<PAnnotation> 
//     }),

//     'asynchronous': {
//         'interfaces': d({
//             // "Callback": ['group', {
//             //     'members': d({
//             //         "callback": method(typeReference("common", "String")),
//             //     }),
//             // }],

//         }),
//         'algorithms': d({

//         }),
//         'functions': d({
//             //"CreateCodeCompletionsFinder": func(typeReference("Location"), null, interfaceReference("Callback"), inf(interfaceReference( "tth", "TypedHandler"))),
//             //"CreateHoverTextsFinder": func(typeReference("common", "Null"), null, null, null),

//         }),
//     },
//     'synchronous': {
//         'interfaces': d({}),
//         'constructors': d({}),
//         'functions': d({}),
//     },
// }