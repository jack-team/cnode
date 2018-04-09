<template>
    <div class="mescroll scroll-view" :id="randomId" @scroll="onScroll">
        <div class="scroll-content">
            <slot>
                <div class="default-page" v-if="!userLoadMore">
                    <Loading></Loading>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
    import MeScroll from 'mescroll.js';
    import randomStr from './randomString';
    import Loading from './../Loading';

    export default {
        name: "scroll-view",
        components:{
            Loading
        },
        props: {
            //到底部多少像素执行onEndReached
            onEndReachedThreshold: {
                type: Number,
                default: 600
            },
            //启用上滑加载更多
            userLoadMore: {
                type: Boolean,
                default: false
            },
            //启用下拉刷新
            useRefresh: {
                type: Boolean,
                default: false
            },
            scrollToY: {
                type: Number,
                default: 0
            },
            showLoading:{
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                scroll: null,
                oneAction: true,//第一次动作
                randomId: `scroll_${randomStr(16)}`
            }
        },
        mounted() {
            this.$nextTick(() => this.init());
        },
        beforeDestroy() {
            if (this.scroll) {
                this.scroll.destroy();
            }
        },
        methods: {
            bind(fn) {
                return fn.bind(this.scroll);
            },
            init() {
                this.scroll = new MeScroll(this.randomId, {
                    //上滑加载
                    up: {
                        auto: true,
                        isBounce: false,
                        isBoth: true,
                        offset: this.onEndReachedThreshold,
                        use: this.userLoadMore,
                        callback: () => this.onLoadMore()
                    },
                    //下拉刷新
                    down: {
                        auto: false,
                        isBounce: false,
                        isBoth: true,
                        warpClass: `mescroll-downwarp`,
                        offset: 80,
                        use: this.useRefresh,
                        callback: e => this.pullDown(e)
                    }
                });
            },
            pullDown() {
                const {endSuccess} = this.scroll;
                this.$emit(`refresh`, () => {
                    setTimeout(() => {
                        this.bind(endSuccess)()
                    }, 500)
                });
            },
            onLoadMore() {
                const {endSuccess} = this.scroll;
                //如果是第一次加载更多

                let emitType = `loadMore`;

                //这个只会首次执行
                if (this.oneAction) {
                    emitType = `onceLoad`
                }

                const times =  this.oneAction ? 500 : 0;

                setTimeout(() => (
                    this.$emit(emitType, () => {
                        this.bind(endSuccess)(100, true)
                    })
                ),times);

                this.oneAction = false;
            },
            onScroll({currentTarget}) {
                const {scrollTop} = currentTarget;
                this.$emit(`scroll`, {
                    y: scrollTop
                });
            },
            _scrollToY() {
                const {scrollToY} = this;
                this.scroll.scrollTo(scrollToY, 0);
            }
        },
        watch: {
            scrollToY() {
                this.$nextTick(()=>this._scrollToY());
            }
        }
    }
</script>

<style lang="scss">
    @import "~mescroll.js/mescroll.min.css";
</style>

<style lang="scss">
    .scroll-view {
        position: relative;
        .mescroll-downwarp {
            position: relative;
            overflow: hidden;
        }
        .downwarp-content {
            position: absolute;
            left: 50%;
            top: 50%;
            bottom: auto;
            padding: 0;
            min-height: auto;
            transform: translate3d(-50%, -50%, 0);
        }
        .default-page {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>