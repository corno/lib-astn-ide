import * as tth from "api-astn-typedhandlers"

import { TLocation } from "../types/Location.p"
import { CreateCodeCompletionFinder_Dependencies } from "../dependencies/dependencies.p"

export type CreateCodeCompletionFinder = <PAnnotation>(
    $: {
        readonly "completionPosition": TLocation,
    },
    $i: {
        readonly "callback": ($: string) => void,
    },
    $d: CreateCodeCompletionFinder_Dependencies<PAnnotation>
) => tth.ITypedHandler<PAnnotation>


export type FCreateHoverTextsFinder = <PAnnotation>(
    $: {
        readonly "position": TLocation, //the line and character where the hover is requested
    },
    $i: {
        readonly "callback": ($: string) => void,
    },
    $d: CreateCodeCompletionFinder_Dependencies<PAnnotation>
) => tth.ITypedHandler<PAnnotation>