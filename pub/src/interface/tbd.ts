import { SerializeString } from "../imp/createCodeCompletionsGenerator"
import { Location } from "./types/Location"
import * as tth from "api-astn-typedhandlers"

export type CreateCodeCompletionFinder_Data = {
    completionPosition: Location,
}
export type CreateCodeCompletionFinder_Interfaces = {
    callback: (codeCompletion: string) => void,
}
export type CreateCodeCompletionFinder_Dependencies<Annotation> = {
    getStartLocation: ($: Annotation) => Location,
    getEndLocation: ($: Annotation) => Location,
    serializeString: SerializeString,
    push: <T>(array: T[], element: T) => void
    getArrayLength: <T>(array: T[]) => number
    getElement: <T>(array: T[], position: number) => T
}

export type CreateCodeCompletionFinder = <Annotation>(
    $: CreateCodeCompletionFinder_Data,
    $i: CreateCodeCompletionFinder_Interfaces,
    $d: CreateCodeCompletionFinder_Dependencies<Annotation>
) => tth.ITypedHandler<Annotation>



export type CreateHoverTextsFinder_Data = {
    position: Location, //the line and character where the hover is requested
}
export type CreateHoverTextsFinder_Interfaces = {
    callback: (hoverText: string) => void,
}
export type CreateHoverTextsFinder_Dependencies<Annotation> = {
    getStartLocation: ($: Annotation) => Location,
    getEndLocation: ($: Annotation) => Location,
}

export type CreateHoverTextsFinder = <Annotation>(
    $: CreateHoverTextsFinder_Data,
    $i: CreateHoverTextsFinder_Interfaces,
    $d: CreateHoverTextsFinder_Dependencies<Annotation>
) => tth.ITypedHandler<Annotation>