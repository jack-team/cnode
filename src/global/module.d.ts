declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

declare module 'fastclick' {
    export const attach: (el: Element) => void
}

declare module 'photoswipe' {
    export default class a {
        public constructor(a: any, b: any, c: any, d: any)
        public init(): void
    }
}

declare module 'photoswipe/dist/photoswipe-ui-default.js' {}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
