<template>
    <div class="ms-page" v-has-header>
        <THeader :title="'用户中心'">
            <div class="user-center" slot="bottom" v-if="!!user">
                <div class="user-avator" :style="{backgroundImage:`url(${user.avatar_url})`}"></div>
                <div class="center-right">
                    <p class="login-name">{{user.loginname}}</p>
                    <div class="score">
                        积分：{{user.score}} | 注册于：{{getTime(user.create_at)}}
                    </div>
                </div>
            </div>
            <button slot="right" v-if="isme" class="login-out" @click="loginOut">退出</button>
        </THeader>
        <div class="container">
            <TabBar :tableLabel="tableLabel" :hasLine="true" :page="page" :onChange="pageChange" v-if="!!user">
                <TabbarItem v-for="(items,index) in itemList" :key="index">
                    <ScrollView>
                        <ul class="item-container" v-if="!!items.length">
                            <li v-for="item in items" class="item" @click="jump(item)">
                                <div class="avator" :style="{backgroundImage:`url(${item.author.avatar_url})`}"></div>
                                <div class="right-desc">
                                    <div class="title text-line-1">{{item.title}}</div>
                                    <div class="item-info">
                                        <span>
                                            {{item.author.loginname}}
                                        </span>
                                        <span>
                                            {{getTime(item.last_reply_at)}}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="empty-box" v-else>
                            <Empty></Empty>
                        </div>
                    </ScrollView>
                </TabbarItem>
            </TabBar>
            <Loading v-else></Loading>
        </div>
    </div>
</template>

<script>
    import {TabBar, TabbarItem, Empty, Loading} from './../components';
    import userTypes from './../store/types/user';
    import {mapState, mapActions} from 'vuex';

    const actions = mapActions({...userTypes});
    export default {
        name: "user",
        components: {
            TabBar,
            TabbarItem,
            Empty,
            Loading
        },
        data() {
            return {
                ...actions,
                page: 0,
                tableLabel: [
                    {name: `最近回复`},
                    {name: `最新发布`}
                ]
            }
        },
        mounted() {
            const {loginName} = this.$route.params;
            this.getUserInfo(loginName);
        },
        computed: {
            ...mapState({
                userState: state => state.user
            }),
            user() {
                const {loginName} = this.$route.params;
                return this.userState.userSave[loginName];
            },
            itemList() {
                const {recent_replies, recent_topics} = this.user;
                return [recent_replies, recent_topics];
            },
            isme() {
                const {loginname} = this.userState.userInfo || {};
                return loginname === (this.user || {}).loginname;
            }
        },
        methods: {
            getTime: time => diffTime(time),
            pageChange(page) {
                this.page = page;
            },
            jump(item) {
                this.$router.push(`/detail/${item.id}`);
            },
            loginOut() {
                this.$PopUp.confirm(`提示`, `确定要退出登录吗？`, () => {
                    this.unLogin();
                    this.$router.replace(`/`);
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        height: 100%;
        padding-top: 110px;
        position: relative;
    }

    .user-center {
        width: 100%;
        display: flex;
        height: 110px;
        align-items: center;
        padding: 0 20px 14px 20px;
    }

    .user-avator {
        width: 90px;
        height: 90px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 45px;
        position: relative;
        z-index: 1;
        background-color: #ccc;
    }

    .center-right {
        flex: 1;
        color: #fff;
        padding-left: 12px;
        display: flex;
        flex-direction: column;
        font-size: 12px;
    }

    .login-name {
        font-size: 16px;
        color: #fff;
        font-weight: 500;
        margin-bottom: 20px;
    }

    .score {
        margin-bottom: 4px;
    }

    .item-container {
        background: #fff;
    }

    .item {
        display: flex;
        padding: 10px;
        border-bottom: 1px solid #ececec;

        &:active {
            background-color: #f6f6f6;
        }

        .avator {
            width: 48px;
            height: 48px;
            border-radius: 24px;
            background-size: cover;
            background-color: #ececec;
            background-position: center;
            background-repeat: no-repeat;
        }

        .right-desc {
            flex: 1;
            padding: 4px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 4px;
        }

        .title {
            font-size: 14px;
            color: #333;
            font-weight: 500;
            line-height: 20px;
        }
        .item-info {
            span {
                display: block;
            }
            display: flex;
            justify-content: space-between;
            color: #666;
            font-size: 12px;
        }

    }

    .login-out {
        display: block;
        height: 100%;
        background-color: transparent;
        color: #fff;
        padding: 0 10px;
        font-size: 16px;
    }
</style>