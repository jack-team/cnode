<template>
    <div class="ms-page message-page" v-has-header>
        <THeader :title="`消息`"></THeader>
        <TabBar :tableLabel="tableLabel" :page="page" :hasLine="true" :onChange="pageChange">
            <TabbarItem v-for="(message,index) in messages" :key="index">
                <ScrollView>
                    <div v-if="isLoaded &&!message.length" class="empty-box">
                        <Empty></Empty>
                    </div>
                    <ul class="items-container" v-if="!!message.length && isLoaded">
                        <li v-for="item in message">
                            <div class="user-info">
                                <div
                                    class="avator bg-common"
                                    :style="{backgroundImage:`url(${item.author.avatar_url})`}"
                                    @click="goUser(item)"
                                >
                                </div>
                                <div class="user-desc">
                                    <div class="name">{{item.author.loginname}}回复了你</div>
                                    <div>{{getTime(item.create_at)}}</div>
                                </div>
                            </div>
                            <div class="content" v-html="item.reply.content"></div>
                        </li>
                    </ul>
                </ScrollView>
            </TabbarItem>
        </TabBar>
    </div>
</template>

<script>
    import {
        TabBar,
        TabbarItem,
        ScrollView,
        Empty
    } from './../components'

    import { mapState , mapActions } from 'vuex';
    import userTypes from './../store/types/user';
    const actions = mapActions({...userTypes});

    export default {
        name: "message",
        components:{
            TabBar,
            TabbarItem,
            ScrollView,
            Empty
        },
        mounted(){
            const { access_token } = this.userState;
            this.getUserMessage(access_token).finally(()=>{
                this.isLoaded = true;
            });
        },
        data(){
            return {
                ...actions,
                page:0,
                tableLabel:[
                    {name:`已读消息`},
                    {name:`未读消息`}
                ],
                isLoaded:false
            }
        },
        computed:{
            ...mapState({
                userState:state=>state.user
            }),
            messages(){
                const { message } = this.userState;
                const {
                    has_read_messages=[],
                    hasnot_read_messages=[]
                } = message;
                return [has_read_messages,hasnot_read_messages];
            }
        },
        methods:{
            pageChange( page ){
                this.page = page;
            },
            getTime:time=>formatTime(time),
            goUser(item){
                const { loginname } = item.author;
                this.$router.push(`/user/${loginname}`);
            }
        }
    }
</script>

<style lang="scss">
    @import "./../styles/markdown";

    .message-page {
        .markdown-text {
            background-color: #f6f6f6;
            border-radius: 6px;
            font-size: 14px;
            color: #666;
            padding: 16px;
            border: 1px solid #ececec;
        }
    }
</style>

<style scoped lang="scss">

    .items-container {
        li {
            padding: 10px 16px;
            background: #fff;
            border-bottom: 1px solid #ececec;
        }
        .user-info {
            display: flex;
        }
        .avator {
            width: 40px;
            height: 40px;
            border-radius: 20px;
        }

        .user-desc {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 2px 10px;
            font-size: 12px;
            color: #666;
        }

        .name {
            font-size: 14px;
            color: #333;
        }

        .content {
            margin-top: 10px;
            position: relative;
            &:before,&:after {
                content: '';
                display: block;
                width: 0;
                height: 0;
                position: absolute;
                left: 15px;
                top: -5px;
                border-top: 6px solid #ececec;
                border-right: 6px solid transparent;
                border-left: 6px solid transparent;
                transform: rotate(180deg);
                z-index: 1;
            }

            &:after {
                border-top: 5px solid #f6f6f6;
                border-right: 5px solid transparent;
                border-left: 5px solid transparent;
                top: -3.5px;
                left: 16px;
                z-index: 2;
            }
        }
    }
</style>