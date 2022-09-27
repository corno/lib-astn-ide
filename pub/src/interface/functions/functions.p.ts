import * as tth from "api-astn-typedhandlers"

import { TLocation } from "../types/Location.p"
import { DCreateCodeCompletionFinder } from "../dependencies/dependencies.p"

export type CreateCodeCompletionFinder = <PAnnotation>(
    $: {
        readonly "completionPosition": TLocation,
    },
    $i: {
        readonly "callback": ($: string) => void,
    },
    $d: DCreateCodeCompletionFinder<PAnnotation>
) => tth.ITypedHandler<PAnnotation>


export type FCreateHoverTextsFinder = <PAnnotation>(
    $: {
        readonly "position": TLocation, //the line and character where the hover is requested
    },
    $i: {
        readonly "callback": ($: string) => void,
    },
    $d: DCreateCodeCompletionFinder<PAnnotation>
) => tth.ITypedHandler<PAnnotation>