<template>
    <div class="dialog-container" :class="containerClass" @touchmove="touchMove">
        <div class="dialog-layer" :class="layerClass" @click="onLayerClick" :style="layerStyle"/>
        <div class="dialog-content" :class="contentClass">
            <span ref="replace"></span>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import {
        Prop,
        Component
    } from 'vue-property-decorator';

    const position: Array<string> = [
        `top`, `bottom`, `left`, `right`, `none`
    ]
    @Component
    export default class Dialog extends Vue {
        iShow: boolean = false;
        animating: boolean = false;
        layerShow: boolean = false;
        contentShow: boolean = false;
        containerShow: boolean = false;

        @Prop({
            default: `none`,
            validator: (value: string): boolean => position.includes(value)
        }) position!: string;

        @Prop({
            default: () => {}
        }) onClosed!: Function;

        @Prop({
            default: () => {}
        }) onShowed!: Function;

        @Prop({
            default:.3
        }) maskOpacity!:number

        @Prop({
            default:false
        }) clickClose!:boolean

        mounted() {
            this.$nextTick(() => this.init())
        }

        init() {
            this.show()
        }

        show() {
            if (this.animating) {
                return false
            }
            this.animating = true;
            this.containerShow = true;
            setTimeout(() => {
                this.layerShow = true
                this.contentShow = true;
                setTimeout(() => {
                    this.iShow = true;
                    this.animating = false;
                    this.onShowed();
                }, 350)
            }, 150)
        }

        close() {
            if (this.animating) {
                return false
            }
            this.animating = true;
            this.contentShow = false;
            this.layerShow = false;
            setTimeout(() => {
                this.iShow = false;
                this.animating = false;
                this.containerShow = false;
                this.onClosed();
            }, 350)
        }

        get containerClass(): string {
            return this.containerShow ? `show` : ``
        }

        get contentClass(): Array<string> {
            return [
                this.position,
                this.contentShow ? `show` : ``
            ]
        }

        get layerClass(): string {
            return this.layerShow ? `show` : ``
        }

        get layerStyle() {
            return {
                backgroundColor:`rgba(0,0,0,${this.maskOpacity})`
            }
        }

        touchMove(e: TouchEvent) {
            e.preventDefault()
        }

        onLayerClick() {
            if(this.clickClose) {
                this.close()
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "./../../common/var";

    .dialog-container {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        position: fixed;
        visibility: hidden;
        z-index: 999;

        &.show {
            visibility: visible;
        }

        .dialog-layer {
            width: 100%;
            height: 100%;
            z-index: 0;
            opacity: 0;
            position: absolute;
            transition: opacity .3s $bezier;
            &.show {
                opacity: 1;
            }
        }

        .dialog-content {
            z-index: 1;
            position: absolute;
            transition: all .35s $bezier;

            /*居中*/
            &.none {
                left: 50%;
                top: 50%;
                opacity: 0;

                transform: translate3d(-50%, -50%, 0) scale(.4);
                &.show {
                    opacity: 1;
                    transform: translate3d(-50%, -50%, 0) scale(1);
                }
            }

            /*顶部*/
            &.top {
                top: 0;
                width: 100%;
                transform: translateY(-100%);
                &.show {
                    transform: translateY(0);
                }
            }

            /*底部*/
            &.bottom {
                bottom: 0;
                width: 100%;
                transform: translateY(100%);
                &.show {
                    transform: translateY(0);
                }
            }

            /*左边*/
            &.left {
                left: 0;
                top: 0;
                height: 100%;
                transform: translateX(-100%);
                &.show {
                    transform: translateX(0);
                }
            }

            /*右边*/
            &.right {
                right: 0;
                top: 0;
                height: 100%;
                transform: translateX(100%);
                &.show {
                    transform: translateX(0);
                }
            }
        }
    }
</style>