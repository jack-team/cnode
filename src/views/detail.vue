<template>
    <div class="ms-page" v-has-header>
        <MsHeader :title="`详情`"></MsHeader>
        <ScrollView :useRefresh="true" @refresh="getData">
            <div v-if="!!getDesc">
                <div class="desc">
                    <h3 class="top-title">{{getDesc.title}}</h3>
                    <div class="others">
                        <div class="left">
                            <div class="avator" :style="getBgStyle(getDesc)"></div>
                            <div class="user-desc">
                                <div>{{getDesc.author.loginname}}</div>
                                <div>发布于{{getTime(getDesc.create_at)}}</div>
                            </div>
                        </div>
                        <div class="right">
                            <span>{{getDesc.visit_count}}次浏览</span>
                        </div>
                    </div>
                </div>
                <div class="detail" v-html="getDesc.content" @click="findNodes"></div>
                <div class="comment-container">
                    <div class="comment-header">
                        <div class="comment-num">
                            共{{getDesc.reply_count}}条回复
                        </div>
                        <ms-button class="comment-btn" @click="showCommentModal">
                            点击评论
                        </ms-button>
                    </div>
                    <div class="comment-content" v-if="!!getDesc.replies.length">
                        <div v-for="comment in getDesc.replies" class="comment-list">
                            <div class="comment-user">
                                <div class="user-avator" :style="getBgStyle(comment)" @click="goUser(comment)"></div>
                                <div class="user-desc">
                                    <div>{{comment.author.loginname}}</div>
                                    <div>{{getTime(comment.create_at)}}</div>
                                </div>
                            </div>
                            <div v-html="comment.content"></div>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollView>
        <Modal :show="modalShow" :position="'bottom'" :onClose="()=>this.modalShow=false">
            <form class="comment-form" @submit.prevent="onSubmit">
                <div class="input-wrapper">
                    <textarea
                       v-textarea-auto
                       contenteditable="true"
                       placeholder="输入评论"
                       class="input-comment"
                       v-model="commentText"
                    >
                    </textarea>
                </div>
                <button class="send-btn">发布</button>
            </form>
        </Modal>
    </div>
</template>

<script>
    import { MsHeader , Modal ,MsButton } from './../components';
    import { mapActions , mapState } from 'vuex'
    import detailTypes from './../store/types/detail';
    const actions = mapActions({...detailTypes});
    export default {
        name: "detail",
        components:{
            MsHeader,
            Modal,
            MsButton
        },
        data(){
            return {
                ...actions,
                isToTop:true,
                commentText:``,
                modalShow:false,
                disabledRefresh:false,
            }
        },
        computed:{
            ...mapState({
                detail: state => {
                    return state.detail
                },
                userState:state=>state.user
            }),

            getTopicId(){
                const { params } = this.$route;
                return params.id;
            },

            getDesc(){
                const { desc } = this.detail;
                return desc[this.getTopicId];
            }
        },
        mounted(){
            this.networker=setTimeout(()=>{
                this.getData();
            },600);
        },

        beforeDestroy(){
            this.networker&&clearTimeout(this.networker);
        },

        methods:{
            getData(cb=()=>{}){
                return this.getDetail(this.getTopicId).then(cb)
            },
            onRefresh(cb){
                this.getData().then(cb);
            },
            getTime:time=>{
                return diffTime(time);
            },
            findNodes(e){
               const target = e.target;
               if(target.nodeName === `IMG`) {
                  console.log(target.src)
               }
            },
            showCommentModal(){
                this.modalShow=!this.modalShow
            },
            getBgStyle({author}){
                const uri=`url(${author.avatar_url})`;
                return { backgroundImage:uri }
            },
            onSubmit(){
                let { commentText, userState } = this;
                commentText = trim(commentText);
                if(!commentText){
                    return this.$PopUp.tip(`请输入评论`);
                }

                const isLogin = getUserLogin();

                if(!isLogin) {
                    return this.$openLogin(cb=>{
                        cb();
                        this.commenting();

                    });
                }
                this.commenting();
            },
            commenting(){
                let { commentText, userState } = this;
                const { access_token } = userState;
                loading(`发送中...`);
                this.$http.post(`/topic/${this.getTopicId}/replies`,{
                    accesstoken:access_token,
                    content:commentText
                }).then(()=>{
                    this.$PopUp.toast(`评论成功！`);
                    this.getData();
                    this.commentText=``;
                    this.showCommentModal();
                }).finally(loadingClose);
            },
            goUser(item){
                const {loginname}=item.author;
                this.$router.push(`/user/${loginname}`);
            }
        }
    }
</script>

<style lang="scss">
    @import "./../styles/markdown.scss";
</style>

<style scoped lang="scss">
    .desc {
        padding: 16px 12px;
        background: #fff;
        .top-title {
            line-height: 24px;
        }

        .others {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
        }

        .left {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .right {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #999;
            span {
                display: block;
            }
        }

        .user-desc {
            font-size: 12px;
            color: #999;
            margin-left: 6px;
            *:first-child {
                margin-bottom: 4px;
            }
        }
        .avator {
            width: 36px;
            height: 36px;
            border-radius: 18px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
    }
    .detail {
        width: 100%;
        margin: 4px 0;
    }
    .comment-container {
        background-color: #fff;

        .comment-header {
            padding: 6px 10px;
            border-left: 3px solid #FF5655;
            border-bottom: 1px solid #ececec;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .comment-num {
            font-size: 16px;
        }
        .comment-btn {
            height: 36px;
            padding: 0 10px;
            border-radius: 6px;
        }
        .comment-content {
            padding: 8px;
            .comment-list {
                padding-top: 12px;
                border-bottom: 1px solid #ececec;

                &:last-child{
                    border-bottom: none;
                }
            }
            .comment-user {
                display: flex;
                align-items: center;
            }
            .user-avator {
                width: 36px;
                height: 36px;
                border-radius: 18px;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
            .user-desc {
                flex: 1;
                font-size: 12px;
                color: #999;
                margin-left: 6px;
                *:first-child {
                    margin-bottom: 4px;
                }
            }
        }
    }
    .comment-form {
        width: 100%;
        background-color: #fff;
        display: flex;
        border-top: 1px solid #FF5655;
        align-items: center;
        padding:10px 0 10px 10px ;
        .input-wrapper {
            min-height: 36px;
            flex: 1;
            background-color: #ececec;
            border-radius: 4px;
            display: flex;
            align-items: center;
            padding: 6px 8px;
        }
        .input-comment {
            background-color: transparent;
            width: 100%;
            outline: none;
            border: none;
            font-size: 14px;
            color: #565656;
            resize:none;
            padding: 0;
            height: 22px;
        }
        .send-btn {
            height: 36px;
            width: 60px;
            background-color: transparent;
            color: #FF5655;
        }
    }
</style>