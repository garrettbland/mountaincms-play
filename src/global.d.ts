import { filters, getConfig, parse } from 'squirrelly/dist/types/browser'

// declare global {
//     namespace Sqrl {
//         var filters: filters
//         var defaultConfig: getConfig
//         var parse: parse
//     }
// }

declare global {
    interface Window {
        Sqrl: {
            filters: filters
            defaultConfig: getConfig
            parse: parse
        }
    }
}
