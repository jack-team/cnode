<template>
    <div class="ms-scroll" ref="element">
        <div class="ms-scroll-content">
            <slot></slot>
        </div>
        <button class="back-top" :class="{hide:!isShowToTop}" v-if="isToTop" @click="toTop"></button>
    </div>
</template>
<script>
    import jRoll from './jroll';
    import Loading from './loading.gif';
    import Arrow from './arrow.png';
    import Success from './success.png';
    const abs = num => Math.abs(num);
    export default {
        name: "scroll-view",
        props: {
            //到底部多少像素执行onEndReached
            onEndReachedThreshold: {
                type: Number,
                default:500
            },
            //到底部回调
            onEndReached: {
                type: Function,
                default: () => {}
            },
            //下拉刷新回调
            onRefresh: {
                type: Function,
                default: () => {}
            },
            //禁用下拉刷新
            disabledRefresh: {
                type: Boolean,
                default: false
            },
            //滚动回调
            onScroll: {
                type: Function,
                default: () => {}
            },
            //下刷新向上箭头图标
            iconArrow:{
                type:String,
                default:Arrow
            },
            //刷新完成图标
            iconFinish:{
                type:String,
                default:Success
            },
            //刷新中loading图标
            iconLoading:{
                type:String,
                default:Loading
            },
            //scrollView 初始化完成后回调，返回滚动实列
            onload:{
                type: Function,
                default: () => {}
            },
            isToTop:{
                type:Boolean,
                default:false
            }
        },

        data() {
            return {
                scrollX: 0,
                scrollY: 0,
                isOnEndReached: false,
                isShowToTop:false,
                nameConfig: {
                    x: [`right`, `left`],
                    y: [`down`, `up`]
                },
                eventTypes: [
                    `scrollStart`,
                    `scroll`,
                    `scrollEnd`,
                    `touchEnd`
                ]
            }
        },

        created(){
            this.$nextTick(this.init);
        },

        methods: {
            init() {
                const {element} = this.$refs;
                this.jRoll = new jRoll(element, {
                    scrollBarY: true,
                    scrollBarFade: true
                });

                this.bindEvent();

                //启用pullDown
                if (!this.disabledRefresh) {
                    this.pullDown()
                }

                this.onload(this.jRoll);
            },

            getCurrentSize(el) {
                return {
                    height:el.clientHeight,
                    width:el.clientWidth
                };
            },

            getImageStr(icon) {
                return `<img class="load_image" src="${icon}"/>`;
            },

            pullDown() {
                this.jRoll.pulldown({
                    textLoading: "正在刷新",
                    spinning: false,
                    iconArrow: this.getImageStr(this.iconArrow),
                    iconLoading: this.getImageStr(this.iconLoading),
                    iconFinish: this.getImageStr(this.iconFinish),
                    refresh: this.onRefresh
                });
            },

            bindEvent() {
                this.eventTypes.forEach(type => (
                    this.jRoll.on(type, e => this.handel(type))
                ));
            },

            handel(eventType) {

                const {x, y} = this.jRoll;

                this.shouldRefresh();

                switch (eventType) {
                    case `scrollStart`:
                        this.scrollX = x;
                        this.scrollY = y;
                        break;
                    case `scroll`:
                        this.handelOut();
                        this.showTopButton();
                        break;
                    case `scrollEnd`:
                        this.handelOut();
                        break;
                }
            },

            showTopButton(){
                const { y ,wrapperHeight} = this.jRoll;
                this.isShowToTop = (Math.abs(y)+50 > wrapperHeight);
            },

            handelOut() {

                const result = this.computed();

                const {
                    onEndReached,
                    onEndReachedThreshold,
                    onScroll
                } = this;

                onScroll(this.jRoll);

                const {y, maxScrollY} = this.jRoll;

                if (result.y === false) return false;

                const diffY = abs(maxScrollY) - abs(y);

                if (diffY <= onEndReachedThreshold) {
                    if (!this.isOnEndReached) {
                        this.isOnEndReached = true;
                        onEndReached();
                    }
                    return false;
                }
                this.isOnEndReached = false;
            },

            computed() {
                const {s} = this.jRoll;

                let compute = {x: false, y: false};

                [`x`, `y`].some(key => {

                    const useKey = key.toLocaleUpperCase();

                    if (s !== `scroll${useKey}`) return false;

                    const names = this.nameConfig[key];

                    const range = this.jRoll[key],
                        minRange = this.jRoll[`minScroll${useKey}`],
                        maxRange = this.jRoll[`maxScroll${useKey}`];

                    //超出最小边界
                    if (range >= minRange) return false;

                    //超出最大边界
                    if (abs(range) >= abs(maxRange)) return false;

                    const diffRange = range - this[`scroll${useKey}`];

                    if (diffRange !== 0) {
                        compute[key] = diffRange > 0 ? names[0] : names[1];
                    }

                    if (abs(diffRange) >= 6) {
                        this[`scroll${useKey}`] = range;
                    }
                    return true;
                });

                return compute;
            },

            rectChange() {
                const types = [`scroller`, `wrapper`];
                return types.some(type => {
                    const element = this.jRoll[type];
                    const oldWidth = ~~this.jRoll[`${type}Width`],
                        oldHeight = ~~this.jRoll[`${type}Height`];
                    const { width , height} = this.getCurrentSize(element);
                    return (~~width !== oldWidth || ~~height !== oldHeight);
                });
            },

            shouldRefresh() {
                const isRefresh = this.rectChange();
                if (isRefresh) {
                    this.refresh();
                }
            },

            refresh() {
                this.jRoll.refresh();
            },

            toTop(){
                this.jRoll.scrollTo(0,0,300);
                this.isShowToTop=false;
            }
        },

        beforeDestroy(){
            this.jRoll && this.jRoll.destroy();
        }
    }
</script>

<style scoped lang="scss">
    .ms-scroll {
        width: 100%;
        height: 100%;
        position: relative;

        .back-top {
            position: absolute;
            width: 40px;
            height: 40px;
            z-index: 10;
            border-radius: 24px;
            right: 20px;
            bottom: 100px;
            background-color: #1abc9c;

            &:before {
                content: '';
                display: block;
                width: 32px;
                height: 32px;
                border-radius: 16px;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                background-image: url("totop_icon@2x.png");
                z-index: 2;
            }

            &:after {
                content: '';
                width: 30px;
                height: 30px;
                background-color: #fff;
                border-radius: 15px;
                display: block;
                z-index: 1;
            }

            &:after,&:before{
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
            }

            &.hide {
                display: none;
            }
        }
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
        top:auto !important;
        left: auto !important;
        width: auto!important;
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