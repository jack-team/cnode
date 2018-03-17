<template>
    <div class="ms-page" v-has-header>
        <MsHeader :title="'用户中心'"></MsHeader>
        <div v-if="!!user" class="container">
            <div class="user-top">
                <div class="user-cover" v-if="!!user">
                    <div class="user-avator" :style="{backgroundImage:`url(${user.avatar_url})`}"></div>
                    <p class="login-name">{{user.loginname}}</p>
                </div>
                <div class="create">
                    <div class="score">
                        积分：{{user.score}}
                    </div>
                    <div class="create-time">
                        注册于：{{getTime(user.create_at)}}
                    </div>
                </div>
            </div>
            <TabBar :tableLabel="tableLabel" :hasLine="true" :page="page" :onChange="pageChange">
                <TabbarItem v-for="(items,index) in itemList" :key="index">
                    <ScrollView :disabledRefresh="true">
                        <ul class="item-container">
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
                    </ScrollView>
                </TabbarItem>
            </TabBar>
        </div>
    </div>
</template>

<script>
    import {MsHeader, TabBar, TabbarItem} from './../components';
    import userTypes from './../store/types/user';
    import {mapState, mapActions} from 'vuex';

    const actions = mapActions({...userTypes});
    export default {
        name: "user",
        components: {
            MsHeader,
            TabBar,
            TabbarItem
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
            }
        },
        methods: {
            getTime: time => diffTime(time),
            pageChange(page) {
                this.page = page;
            },
            jump(item){
                this.$router.push(`/detail/${item.id}`);
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        height: 100%;
        padding-top: 160px;
        position: relative;
    }

    .user-top {
        background: #fff;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
    }

    .user-cover {
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        overflow: hidden;
        &:before {
            content: '';
            display: block;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 0;
            position: absolute;
            filter: blur(2px);
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-image: url('http://static.yutao2012.com/ddd19220-2903-11e8-a48b-bb2c740d795b.jpg');
        }
    }

    .user-avator {
        width: 70px;
        height: 70px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 45px;
        position: relative;
        z-index: 1;
        background-color: #ccc;
    }

    .login-name {
        font-size: 16px;
        color: #fff;
        margin-top: 8px;
        position: relative;
        z-index: 1;
    }

    .create {
        display: flex;
        justify-content: space-between;
        padding: 10px 16px;
        font-size: 14px;
        color: #666;
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
</style>