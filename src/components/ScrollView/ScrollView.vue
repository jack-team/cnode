<template>
    <div class="scroll-view" ref="el">
        <div class="scroll-content">
            <slot></slot>
        </div>
        <div class="pull-down-wrapper" :style="pullDownStyle">{{pullingDownText}}</div>
    </div>
</template>
<script>
    import iScroll from 'better-scroll';
    import Loading from './../Loading/index';
    const abs=num=>Math.abs(num);
    export default {
        name: "scroll-view",
        components: {
            Loading
        },
        props: {
            startY: {
                type: Number,
                default: 0
            },
            onEndReached: {
                type: Function,
                default: () => {
                }
            }
        },
        data() {
            return {
                pullUpLoading: true,
                //是否是下拉刷新之前
                beforePullDown:true,
                //是否刷新在刷新中
                isPullingDown:false,
                scrollY:-30,
                pullingDownText:`下拉刷新`
            }
        },

        created(){
            this.pullDownInitTop= -30;
        },
        mounted() {
            this.$nextTick(this._initScroll);
        },

        computed: {
            options() {
                const {startY} = this;
                return {
                    click: true,
                    startY: startY,
                    bounceTime:500,
                    observeDOM: false,
                    pullDownRefresh: {
                        threshold: 40,
                        stop: 40
                    },
                    pullUpLoad: {
                        threshold: 800
                    }
                }
            },
            pullDownStyle(){
                const { scrollY } = this;
                return {
                    top:`${scrollY}px`
                }
            }
        },

        methods: {
            _bind(fn) {
                const {scroll} = this;
                return fn.bind(scroll);
            },

            _initScroll() {
                const {$refs, options} = this;
                this.scroll = new iScroll($refs.el, options);

                //检测内容变化，刷新页面
                // this._observeDOM();
                //上拉加载
                this._initPullUpLoad();
                //下拉刷新
                this._initPullingDown();
            },

            _observeDOM() {
                const {on} = this.scroll;
                const eventTypes = [`beforeScrollStart`, `scroll`, `scrollEnd`];
                eventTypes.forEach(type => (
                    this._bind(on)(type, () => this._shouldRefresh())
                ));
            },

            _shouldRefresh() {
                const {scroll} = this;
                const elKeys = [`wrapper`, `scroller`];
                const shouldRefresh = elKeys.some(key => {
                    const el = scroll[key];
                    const height = scroll[`${key}Height`];
                    return el.clientHeight !== height;
                });
                if (shouldRefresh) {
                    this.$nextTick(()=>scroll.refresh());
                }
            },

            _initPullUpLoad() {
                const {on, finishPullUp} = this.scroll;
                this._bind(on)(`pullingUp`, () => {
                    this.$emit(`loadMore`, () => {
                        this._bind(finishPullUp)();
                        setTimeout(()=>{
                            this._shouldRefresh();
                        },10)
                    });
                });
            },

            _getDirection(){
                const { movingDirectionY } = this.scroll;
                switch (movingDirectionY) {
                    case 0 : return `none`;
                    case 1 : return `up`;
                    case -1: return `down`;
                }
            },

            _initPullingDown() {
                const { pullDownInitTop , options } = this;
                const {on, finishPullDown} = this.scroll;

                this._bind(on)(`pullingDown`, () => {
                    this.beforePullDown = false;
                    this.isPullingDown = true;
                    this.pullingDownText = `正在刷新`;
                    this.$emit('onRefresh');
                });

                this._bind(on)(`scroll`,({y}) => {
                    const { isPullingDown , beforePullDown } = this;
                    const moveY = y + pullDownInitTop;

                    //如果是自刷新之前
                    if(beforePullDown) {
                        this.scrollY = Math.min(moveY,10);

                        if(abs(y) > abs(options.pullDownRefresh.threshold)){
                            this.pullingDownText=`释放刷新`;
                        } else {
                            this.pullingDownText=`下拉刷新`;
                        }
                    }

                    //如果实在刷新中...
                    if(isPullingDown && y < 0) {
                        this._bind(finishPullDown)();
                        this.isPullingDown = false;
                        this.beforePullDown = true;
                    }
                });
            }

        }
    }
</script>
<style scoped lang="scss">
    .scroll-view {
        height: 100%;
        overflow: hidden;
        position: relative;
    }

    .scroll-content {
        position: relative;
        z-index: 2;
        overflow: hidden;
    }

    .loading-content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 34px;
    }

    .pull-down-wrapper {
        position: absolute;
        width: 100%;
        left: 0;
        z-index: 1;
        height: 30px;
        text-align: center;
        line-height: 30px;
    }
</style>