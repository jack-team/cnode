declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

declare module "fastclick" {
    export const attach: (el: Element) => void
}

