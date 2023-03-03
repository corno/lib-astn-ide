// import * as pl from 'pareto-core-lib'
// import * as pb from 'pareto-core-exe'
// import * as atl from "astn-tokenizer-lib"
// import * as ata from "astn-tokenizer-api"
// import * as pfl from "pareto-filesystem-res"
// import * as all from "astn-loader-lib"
// import * as prl from "pareto-resolve-lib"
// import * as apl from "astn-parser-lib"
// import * as ael from "astn-expect-lib"
// import * as aul from "astn-unmarshall-lib"
// import * as aml from "astn-mrshlschema-lib"

// import { createDummyArrayHandler, createDummyObjectHandler, createDummyRequiredValueHandler, createDummyTaggedUnionHandler, createDummyValueHandler } from "./dummyHandlers"


// pb.runProgram(($) => {
//     //const loaderLib = all.init()
//     if ($.argument === undefined) {
//         throw new Error("MISSING ARGUMENT")
//     }

//     const root = $.argument


//     const parserLib = apl.init()
//     const mrshlschemaLib = aml.init()
//     const expectLib = ael.init()
//     const unmarshallLib = aul.init()

//     const rr = prl.createResolveRegistry<ata.TokenizerAnnotationData>(
//         ($) => {
//             pl.logDebugMessage("RESOLVE ERROR @#$$")
//         }
//     )

//     const ec = expectLib.createCreateExpectContextWithSerializedError<ata.TokenizerAnnotationData>(
//         {
//             issueHandler: pl.logDebugMessage,
//             createDummyValueHandler: createDummyValueHandler
//         },
//         {
//             getRangeStringFromAnnotation: ($) => {
//                 return tokLib.createRangeMessage($.range)
//             }
//         }
//     )(
//         {
//             duplicateEntrySeverity: ["error", null],
//             onDuplicateEntry: ["ignore", null]
//         }
//     )

//     const cache = all.createExternalSchemaCache<ata.TokenizerAnnotationData>(
//         {
//             onError: ($) => {
//                 pl.logDebugMessage(`${all.createExternalCacheErrorMessage($.type)} @ ${$.annotation === null ? "??" : tokLib.createRangeMessage($.annotation.range)}`)
//             }
//         },
//         {
//             deserializer: mrshlschemaLib.createCreateDeserializerWithSerializedError(
//                 {
//                     onError: pl.logDebugMessage
//                 },
//                 rr,
//                 ec,
//             ),
//             convertToASTNSchema: mrshlschemaLib.createConvertToASTNSchema(

//             ),
//             schemaHeaderParser: parserLib.createCreateHeaderParserWithSerializedError(
//                 {
//                     onError: pl.logDebugMessage
//                 },
//             )(
//                 {
//                     // getRangeStringFromAnnotation: ($) => {
//                     //     return tokLib.createRangeMessage($.range)
//                     // }
//                 }
//             ),
//             instanceHeaderParser: parserLib.createCreateHeaderParserWithSerializedError(
//                 {
//                     onError: pl.logDebugMessage
//                 },
//             )(
//                 {
//                     getRangeStringFromAnnotation: ($) => {
//                         return tokLib.createRangeMessage($.range)
//                     }
//                 }
//             ),
//             instanceTreeParser: parserLib.createCreateTreeParserWithSerializedError(
//                 {
//                     onError: pl.logDebugMessage
//                 },
//                 {
//                     getRangeStringFromAnnotation: ($) => {
//                         return tokLib.createRangeMessage($.range)
//                     }
//                 }
//             ),
//             schemaTreeParser: parserLib.createCreateTreeParserWithSerializedError(
//                 {
//                     onError: pl.logDebugMessage
//                 },
//                 {
//                     getRangeStringFromAnnotation: ($) => {
//                         return tokLib.createRangeMessage($.range)
//                     }
//                 }
//             ),
//             unmarshaller: unmarshallLib.createCreateUnmarshallerWithSerializedString<ata.TokenizerAnnotationData>(
//                 {
//                     onError: pl.logDebugMessage,
//                     dummyHandlers: {
//                         requiredValue: createDummyRequiredValueHandler,
//                         value: createDummyValueHandler,
//                         object: createDummyObjectHandler,
//                         array: createDummyArrayHandler,
//                         taggedUnion: createDummyTaggedUnionHandler,
//                     }
//                 },
//                 {
//                     getRangeStringFromAnnotation: ($) => {
//                         return tokLib.createRangeMessage($.range)
//                     }
//                 }
//             ),
//             tokenizer: tokLib.createCreateTokenizerWithSerializedError(
//                 {
//                     onError: pl.logDebugMessage
//                 }
//             ),
//             getSchema: ($, $i) => {
//                 fsLib.file(
//                     [root, "schemas", $.schemaID],
//                     (data) => {
//                         pl.logDebugMessage("HIERO")
//                         $i.consumer.onData(data)
//                         $i.consumer.onEnd(null)
//                         return {
//                             execute: () => { }
//                         }
//                     },
//                     (err) => {
//                         pl.logDebugMessage(">>>>>x")

//                         return {
//                             execute: () => { }
//                         }

//                     }
//                 ).execute(() => {

//                 })
//             },
//         },
//         prl.createResolveRegistry(() => {
//             pl.logDebugMessage("RESOLVE REG PROBLEM")
//         })
//     )

//     pl.logDebugMessage("???")

//     fsLib.file(
//         [root, "schemas", "mrshl/schemaschema@0.1"],
//         (data) => {
//             pl.logDebugMessage("ENABLE THIS AGAIN")
//             // const consumer = all.createStackForSchema<ata.TokenizerAnnotationData, ata.TokenizerAnnotationData>(
//             //     cache,
//             //     lib.createCodeCompletionsGenerator(
//             //         ($, $2, $3) => {
//             //             if ($2 !== null) {
//             //                 pl.logDebugMessage(`${$.range.start.line} ${$2().join("\n")}`)
//             //             }
//             //         },
//             //         (str) => str,
//             //     ),
//             //     ($) => tokLib.createRangeMessage($.range)
//             // )
//             // const tok = tokLib.createCreateTokenizerWithSerializedError(
//             //     {
//             //         onError: pl.logDebugMessage
//             //     }
//             // )(
//             //     {
//             //         consumer: parserLib.,
//             //     }
//             // )
//             // pl.logDebugMessage(data)
//             // tok.onData(data)
//             // tok.onEnd()
//             return {
//                 execute: () => { }
//             }
//         },
//         (err) => {
//             pl.logDebugMessage("ERR")
//             return {
//                 execute: () => { }
//             }

//         }
//     ).execute(() => {

//     })

// })

