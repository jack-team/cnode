<template>
    <div class="tab-view-container">
        <div class="tab-view-scroll" :style="scrollStyle" :class="scrollClass">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue,{
        VNode
    } from 'vue';

    import {
        Watch,
        Prop,
        Component
    } from 'vue-property-decorator';

    interface Node extends VNode {
        isShow: boolean,
        isCreated: boolean,
        nodeCount:number,
        scrollX: boolean;
    }

    @Component
    export default class Container extends Vue {
        @Prop({default: 0}) readonly page!: number;
        @Prop({default: true}) readonly scrollX!: boolean;

        counter: number = 0;
        contents: Array<VNode> = [];

        data(): object {
            return {
                contents: this.$children,
                counter: this.$children.length
            }
        }

        mounted(): void {
            this.onPageChange(this.page)
        }

        onPageChange(page: number): void {
            const {
                length
            } = this.contents;
            this.contents.forEach((
                node: Node,
                i: number
            ) => {
                const isShow = page === i;
                if (isShow) {
                    node.isCreated = true;
                }
                node.isShow = isShow;
                node.nodeCount = length;
                node.scrollX = this.scrollX;
            })
        }

        get scrollStyle() {
            const {
                length
            } = this.contents

            const {
                scrollX
            } = this;

            const translate: string = scrollX ?
                this.translateX : this.translateY;

            return {
                transform: translate,
                WebKitTransform: translate,
                [scrollX ? `width` : `height`]: `${length * 100}%`,
            }
        }

        get translateY() {
            const {
                length
            } = this.contents;
            return `translateY(${-this.page / length * 100}%)`;
        }

        get scrollClass() {
            return !this.scrollX ? `column` : ``
        }

        get translateX() {
            const {
                length
            } = this.contents;
            return `translateX(${-this.page / length * 100}%)`;
        }

        @Watch(`contents`)
        watchChildren(nodes: Array<VNode>): void {
            if (this.counter !== nodes.length) {
                this.counter = nodes.length;
                this.onPageChange(this.page);
            }
        }

        @Watch(`page`)
        watchPage(page: number): void {
            this.onPageChange(page)
        }

        @Watch(`scrollX`)
        watchScrollX() {
            this.onPageChange(this.page)
        }
    }
</script>

<style scoped lang="scss">
    @import "./../../common/var";

    .tab-view-container {
        height: 100%;
        overflow: hidden;
        position: relative;
    }

    .tab-view-scroll {
        height: 100%;
        width: 100%;
        display: flex;
        position: absolute;
        left: 0;
        top: 0;
        transition: transform .4s $bezier;

        &.column {
            flex-direction: column;
        }
    }
</style>