<template>
    <div class="mescroll" ref="element">
        <div class="scroll-view-content" ref="content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {
        Prop,
        Emit,
        Component,
    } from 'vue-property-decorator';

    import meScroll from 'mescroll.js';
    import "mescroll.js/mescroll.min.css";

    import {
        ScrollViewUp
    } from './index'

    @Component
    export default class ScrollView extends Vue {
        @Prop({default:0}) readonly page!:number;
        @Prop({default:() => ({})})  value!:object;
        @Prop({default: 15}) readonly pageSize!: number;
        @Prop({default: true}) readonly useRefresh!: boolean;
        @Prop({default: true}) readonly useLoadMore!: boolean

        myScroll: any = null;
        refreshEndTimer: any = null;
        meScroll: any = meScroll as any;

        mounted() {
            this.init()
        }

        init (){
            const {
                element
            } = this.$refs;

            this.myScroll = (
                new this.meScroll(
                    element,
                    this.options
                )
            )
            this.$emit(`input`,this.myScroll);
        }

        get options(): object {
            const {
                content
            } = this.$refs;

            return {
                down: {
                    auto:false,
                    use:this.useRefresh,
                    callback: () => this.onRefresh()
                },
                up: {
                    empty: {
                        warpId: content
                    },
                    page:{
                        num:this.page,
                        size:this.pageSize
                    },
                    use:this.useLoadMore,
                    noMoreSize: this.pageSize,
                    onScroll:(e:any) => this.onScroll(e),
                    callback: (page:ScrollViewUp) => this.onLoadMore(page)
                }
            }
        }

        onRefresh ():void {
            this.onRefreshEmit();
        }

        onLoadMore (page: ScrollViewUp):void {
            this.onLoadMoreEmit(
                page, (len:number) => this.onLoadMoreEnd(len)
            );
        }

        @Emit(`onRefresh`)
        onRefreshEmit(): Function {
            return () => this.onRefreshEnd()
        }

        @Emit(`onLoadMore`)
        onLoadMoreEmit(
            page: ScrollViewUp,
            cb: Function
        ): void {}

        @Emit(`scroll`)
        onScroll(e:any) {
           return e.getScrollTop()
        }

        onRefreshEnd () {
            this.refreshEndTimer = (
                setTimeout(() => {
                    this.myScroll.endSuccess()
                }, 500)
            )
        }

        onLoadMoreEnd (length: number) :void {
            const hasNext: boolean = length >= this.pageSize;
            this.$nextTick(() => {
                this.myScroll.endSuccess(length, hasNext)
            })
        }

        beforeDestroy() {
            this.myScroll.destroy()
        }
    }

</script>

<style scoped lang="scss">
    .scroll-view-content {
        overflow: hidden;
    }
</style>