<template>
    <div class="loading-container" :class="containerClass">
        <div class="la-line-scale-pulse-out" :style="colorStyle" :class="sizeClass">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {
        Prop,
        Component
    } from 'vue-property-decorator';

    const sizeMap = {
        small:``,
        large:`la-2x`
    } as any;

    @Component
    export default class Loading extends Vue {
        @Prop({default:`small`}) size!:string;
        @Prop({default:`#FF7A4C`}) color!:string;
        @Prop({default:true}) flex!:boolean;

        get colorStyle() {
            return {
                color:this.color
            }
        }

        get sizeClass():string{
           return sizeMap[this.size] || ``
        }

        get containerClass():string {
            return this.flex ? `loading-flex`:``
        }
    }
</script>

<style scoped lang="scss">
    .loading-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .loading-flex {
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .la-line-scale-pulse-out-rapid,
    .la-line-scale-pulse-out-rapid > div {
        position: relative;
        box-sizing: border-box
    }

    .la-line-scale-pulse-out-rapid {
        display: block;
        font-size: 0;
        color: #f40;
        width: 40px;
        height: 32px;

        & > div {
            float: none;
            width: 4px;
            height: 32px;
            margin: 2px;
            margin-top: 0;
            margin-bottom: 0;
            border-radius: 0;
            display: inline-block;
            background-color: currentColor;
            border: 0 solid currentColor;
            animation: line-scale-pulse-out-rapid .9s infinite cubic-bezier(.11, .49, .38, .78)
        }
    }

    .la-line-scale-pulse-out-rapid > div:nth-child(3) {
        animation-delay: -.9s
    }

    .la-line-scale-pulse-out-rapid > div:nth-child(2),
    .la-line-scale-pulse-out-rapid > div:nth-child(4) {
        animation-delay: -.65s
    }

    .la-line-scale-pulse-out-rapid > div:nth-child(1),
    .la-line-scale-pulse-out-rapid > div:nth-child(5) {
        animation-delay: -.4s
    }

    .la-line-scale-pulse-out-rapid.la-sm {
        width: 20px;
        height: 16px
    }

    .la-line-scale-pulse-out-rapid.la-sm > div {
        width: 2px;
        height: 16px;
        margin: 1px;
        margin-top: 0;
        margin-bottom: 0
    }

    .la-line-scale-pulse-out-rapid.la-2x {
        width: 80px;
        height: 64px
    }

    .la-line-scale-pulse-out-rapid.la-2x > div {
        width: 8px;
        height: 64px;
        margin: 4px;
        margin-top: 0;
        margin-bottom: 0
    }

    .la-line-scale-pulse-out-rapid.la-3x {
        width: 120px;
        height: 96px
    }

    .la-line-scale-pulse-out-rapid.la-3x > div {
        width: 12px;
        height: 96px;
        margin: 6px;
        margin-top: 0;
        margin-bottom: 0
    }

    @keyframes line-scale-pulse-out-rapid {
        0% {
            transform: scaley(1)
        }
        80% {
            transform: scaley(.3)
        }
        90% {
            transform: scaley(1)
        }
    }

    .la-line-scale-pulse-out,
    .la-line-scale-pulse-out > div {
        position: relative;
        box-sizing: border-box
    }

    .la-line-scale-pulse-out {
        display: block;
        font-size: 0;
    }

    .la-line-scale-pulse-out.la-dark {
        color: #333
    }

    .la-line-scale-pulse-out > div {
        display: inline-block;
        float: none;
        background-color: currentColor;
        border: 0 solid currentColor
    }

    .la-line-scale-pulse-out {
        width: 40px;
        height: 32px
    }

    .la-line-scale-pulse-out > div {
        width: 4px;
        height: 32px;
        margin: 2px;
        margin-top: 0;
        margin-bottom: 0;
        border-radius: 0;
        animation: line-scale-pulse-out .9s infinite cubic-bezier(.85, .25, .37, .85)
    }

    .la-line-scale-pulse-out > div:nth-child(3) {
        animation-delay: -.9s
    }

    .la-line-scale-pulse-out > div:nth-child(2),
    .la-line-scale-pulse-out > div:nth-child(4) {
        animation-delay: -.7s
    }

    .la-line-scale-pulse-out > div:nth-child(1),
    .la-line-scale-pulse-out > div:nth-child(5) {
        animation-delay: -.5s
    }

    .la-line-scale-pulse-out.la-sm {
        width: 20px;
        height: 16px
    }

    .la-line-scale-pulse-out.la-sm > div {
        width: 2px;
        height: 16px;
        margin: 1px;
        margin-top: 0;
        margin-bottom: 0
    }

    .la-line-scale-pulse-out.la-2x {
        width: 80px;
        height: 64px
    }

    .la-line-scale-pulse-out.la-2x > div {
        width: 8px;
        height: 64px;
        margin: 4px;
        margin-top: 0;
        margin-bottom: 0
    }

    .la-line-scale-pulse-out.la-3x {
        width: 120px;
        height: 96px
    }

    .la-line-scale-pulse-out.la-3x > div {
        width: 12px;
        height: 96px;
        margin: 6px;
        margin-top: 0;
        margin-bottom: 0
    }

    @keyframes line-scale-pulse-out {
        0% {
            transform: scaley(1)
        }
        50% {
            transform: scaley(.3)
        }
        100% {
            transform: scaley(1)
        }
    }
</style>