<template>
    <div class="scroll-view" ref="el">
        <div class="scroll-content">
            <slot>
                <div class="loading bg-common">

                </div>
            </slot>
            <div class="load bg-common" v-if="!isLastPage && isPullingDown"></div>
            <div class="last-page" v-if="isLastPage">没有更多了~</div>
        </div>
    </div>
</template>

<script>
    import jRoll from './jroll';
    import Loading from './loading.gif';
    import Arrow from './arrow.png';
    import Success from './success.png';

    const abs = num => Math.abs(num);

    const getSize = el => ({
        width: el.clientWidth,
        height: el.clientHeight
    });

    const getImageStr = icon => (
        `<img class="load_image" src="${icon}"/>`
    );

    export default {
        name: "scroll-view",
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
            //下刷新向上箭头图标
            iconArrow: {
                type: String,
                default: Arrow
            },
            //刷新完成图标
            iconFinish: {
                type: String,
                default: Success
            },
            //刷新中loading图标
            iconLoading: {
                type: String,
                default: Loading
            },
            scrollToY:{
                type: Number,
                default: 0
            }
        },

        data() {
            return {
                isPullingDown: false,
                isLastPage:false
            }
        },

        created() {
            this.scrollY = 0;
        },

        mounted() {
            this.$nextTick(this._initScroll);
        },

        methods: {
            _bind(fn) {
                const {scroll} = this;
                return fn.bind(scroll);
            },

            _initScroll() {
                const {el} = this.$refs;
                this.scroll = new jRoll(el, {
                    scrollBarY: true,
                    scrollBarFade: true
                });

                const {
                    useRefresh,
                    userLoadMore
                } = this;

                //检测内容和视口变化
                this._observeDOM();

                if (useRefresh) {
                    //下拉刷新
                    this._initPullDown();
                }

                if (userLoadMore) {
                    //上拉加载
                    this._initPullUp();
                }

                this.scroll.on(`scroll`,()=>{
                    this.$emit(`scroll`,this.scroll);
                });
            },

            _observeDOM() {
                const {
                    on,
                    refresh
                } = this.scroll;
                const events = [
                    `scrollStart`,
                    `scroll`,
                    `scrollEnd`
                ];
                events.forEach(evt => (
                    this._bind(on)(evt, () => {
                        if (this._shouldRefresh()) {
                            this._bind(refresh)();
                        }
                    })
                ));
            },

            _shouldRefresh() {
                const els = [`scroller`, `wrapper`];
                return els.some(s => {
                    const el = this.scroll[s],
                          height = this.scroll[`${s}Height`];
                    const size = getSize(el);
                    return height !== size.height;
                });
            },

            _initPullDown() {
                const {pulldown} = this.scroll;
                this._bind(pulldown)({
                    textLoading: "正在刷新",
                    spinning: false,
                    iconArrow: getImageStr(this.iconArrow),
                    iconLoading: getImageStr(this.iconLoading),
                    iconFinish: getImageStr(this.iconFinish),
                    refresh: fn => this.$emit(`refresh`, fn)
                });
            },

            _initPullUp() {
                let {on} = this.scroll;
                on = this._bind(on);

                //储存点位
                on(`scrollStart`, e => {
                    const {
                        y
                    } = this.scroll;
                    this.scrollY = y;
                });

                const events = [`scroll`, `scrollEnd`];

                events.forEach(evt => on(evt, e => {
                    const dire = this._getDirection();
                    if (dire === `up`) this._pullUpRefresh();
                }));
            },

            _getDirection(cb) {
                const {y} = this.scroll;
                const diffY = y - this.scrollY;
                let direction = `none`;

                if (abs(diffY) >= 5) {
                    direction = diffY > 0 ? `down` : `up`;
                    this.scrollY = y;
                }
                return direction;
            },

            _pullUpRefresh() {
                const {
                    onEndReachedThreshold
                } = this;
                const {
                    y,
                    scrollerHeight,
                    wrapperHeight
                } = this.scroll;
                const diffY = scrollerHeight - abs(y) - abs(wrapperHeight);
                if (diffY < onEndReachedThreshold && !this.isPullingDown) {
                    this.isPullingDown = true;
                    this.$emit(`loadMore`, (isLastPage = false) => {
                        this.isLastPage = isLastPage;
                        this.isPullingDown = false;
                    });
                }
            },

            _scrollToY(){
                const { scrollToY } = this;
                this.scroll.scrollTo(0,scrollToY);
            }
        },

        watch:{
            scrollToY(){
                this._scrollToY();
            }
        },

        beforeDestroy() {
            if (!!this.scroll) {
                const {
                    destroy
                } = this.scroll;
                this._bind(destroy)();
            }
        }
    }
</script>

<style scoped lang="scss">
    .scroll-view {
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;
    }

    .scroll-content {
        overflow: hidden;
    }

    .loading {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 2;
        position: absolute;
        background-size: 30px 30px;
        background-image: url("./loading.gif");
        background-color: #fff;
    }

    .load {
        height: 40px;
        width: 100%;
        background-size: 24px 24px;
        background-image: url("./loading.gif");
    }

    .last-page {
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #666;
        font-size: 14px;
    }

</style>

<style lang="scss">
    .jroll-plugin-pulldown {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .jroll-plugin-pulldown-icon {
        position: relative !important;
        top: auto !important;
        left: auto !important;
        width: auto !important;
        margin-right: 6px;
        height: 44px !important;
        display: flex !important;
        justify-content: center;
        align-items: center;
        .load_image {
            width: 20px;
            height: 20px;
            display: block;
            margin: 0;
        }
    }
    .jroll-plugin-pulldown-text {
        color: #aaa;
        font-size: 14px;
        font-weight: 300;
    }
</style>