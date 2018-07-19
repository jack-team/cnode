<template>
    <ScrollView
            @refresh="onRefresh"
            @loadMore="loadMore"
            :userLoadMore="true"
            :useRefresh="true"
            :scrollToY="initScrollY"
            @scroll="bindScroll"
    >
       <div class="item-container">
           <div v-for="(item , index) in getList" class="item" :key="index" @click="jumpToPage(item)">
               <div class="author">
                   <div class="left">
                       <div class="author-avator" :style="{backgroundImage:`url(${item.author.avatar_url})`}"></div>
                       <div class="author-name">
                           {{item.author.loginname}}
                       </div>
                   </div>
                   <div class="right">
                       {{getTime(item.last_reply_at)}}
                   </div>
               </div>
               <div class="desc">
                   <p class="title">
                       {{item.title}}
                   </p>
                   <div class="desc-icon">
                       <div class="desc-item">
                           <i class="icon eye"></i>
                           <span class="number">
                            {{item.visit_count}}
                        </span>
                       </div>
                       <div class="desc-item">
                           <i class="icon comment"></i>
                           <span class="number">
                            {{item.reply_count}}
                        </span>
                       </div>
                   </div>
               </div>
           </div>
       </div>
    </ScrollView>
</template>

<script>
    import {Loading} from './../components';
    import {mapActions, mapState} from 'vuex'
    import homeTypes from './../store/types/home';

    const actions = mapActions({...homeTypes});
    export default {
        name: "center",
        props: {
            category: {
                type: String,
                default: `good`
            }
        },
        components: {
            Loading
        },
        data() {
            return {
                ...actions,
                initScrollY: 0
            }
        },
        computed: {
            ...mapState({
                home: state => {
                    return state.home
                }
            }),
            getList() {
                const {home, category} = this;
                return home[category].list;
            },
            getPageY() {
                const {home, category} = this;
                return home[category].pageY;
            }
        },

        mounted() {
            this.$nextTick(() => {
                this.initScrollY = this.getPageY || 0;
                this.init();
            });
        },

        beforeDestroy() {
            this.savePageScrollY({
                scrollY: this.scrollY || 0,
                category: this.category
            });
        },

        methods: {
            init() {
                if (!!this.getList.length) return;
                this.loadData(`refresh`);
            },
            onRefresh(cb) {
                this.loadData(`refresh`, cb);
            },
            loadMore(fn) {
                this.loadData(`loadMore`, fn);
            },
            loadData(type = `refresh`, cb = () => {}) {
                const isRefresh = type === `refresh`;
                const {
                    page,
                    isLastPage
                } = this.home[this.category];
                if(!isRefresh && isLastPage) {
                    return cb(true);
                }
                const curPage = isRefresh ? 1 : page + 1;
                this.getTopicList({
                    page: curPage,
                    category: this.category,
                    type: type
                }).finally(cb)
            },
            jumpToPage({id}) {
                this.$router.push(`/detail/${id}`);
            },
            bindScroll({y}) {
                this.scrollY = y;
            },
            getTime: time => formatTime(time)
        }
    }
</script>

<style scoped lang="scss">
    $colorRed: #e74c3c;
    $green: #1abc9c;
    $blue: #3498db;
    $yellow: #e67e22;

    .item-container {
        .item {
            padding: 12px 16px;
            background-color: #fff;
            margin-bottom: 10px;
            border-top: 1px solid #ececec;
            border-bottom: 1px solid #ececec;
            &:first-child {
                border-top: none;
            }

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    .author {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
            display: flex;
            align-items: center;
        }
        .right {
            font-size: 13px;
            color: #999;
        }
        .author-avator {
            width: 28px;
            height: 28px;
            border-radius: 14px;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            background-color: #ececec;
        }
        .author-name {
            font-size: 14px;
            color: #666;
            margin-left: 10px;
        }
    }

    .desc {
        padding: 16px 0 0 0;
        .title {
            font-size: 15px;
            font-weight: 500;
            line-height: 20px;
            color: #333;
            text-align: justify;
        }
        .desc-icon {
            display: flex;
            .desc-item {
                display: flex;
                align-items: center;
                font-size: 12px;
                color: #a8b8c8;
                min-width: 25%;
                max-width: 50%;
                margin-top: 10px;
            }
            .icon {
                width: 20px;
                height: 20px;
                display: block;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
            }
            .icon.eye {
                background-image: url("./../image/eye_icon@2x.png");
            }
            .icon.comment {
                background-image: url("./../image/comment_icon@2x.png");
                background-size: 85% auto;
            }
            .number {
                display: block;
                margin-left: 4px;
            }
        }
    }
    .loading-container {
        display: flex;
        justify-content: center;
        padding: 8px;
    }
</style>