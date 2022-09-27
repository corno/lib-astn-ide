import { TLocation } from "../types/Location.p"

export type CreateHoverTextsFinder_Dependencies<PAnnotation> = {
    readonly "getStartLocation": ($: PAnnotation) => TLocation
    readonly "getEndLocation": ($: PAnnotation) => TLocation
}

export type FSerializeString = (
    $: {
        readonly "rawValue": string
        readonly "quoted": boolean
    }
) => string


export type CreateCodeCompletionFinder_Dependencies<PAnnotation> = {
    readonly "getStartLocation": ($: PAnnotation) => TLocation
    readonly "getEndLocation": ($: PAnnotation) => TLocation
    readonly x: DX
}

export type DX = {

    readonly "serializeString": FSerializeString
    readonly "push": <T>(
        $: {
            readonly "array": T[]
            readonly "element": T
        }
    ) => void
    readonly "getArrayLength": <T>($: T[]) => number
    readonly "getElement": <T>(
        $: {
            readonly "array": T[]
            readonly "position": number
        }
    ) => T
}