<template>
    <div class="ms-page" v-has-header>
        <THeader :title="`详情`"></THeader>
        <ScrollView :useRefresh="true" @refresh="getData">
            <div v-if="has">
                <div class="desc">
                    <h3 class="top-title">{{topicDetail.title}}</h3>
                    <div class="others">
                        <div class="left">
                            <Timage
                               class="avator"
                               :src="getImgUri(topicDetail)"
                               @click="goUser(topicDetail)"
                            >
                            </Timage>
                            <div class="user-desc">
                                <div>{{author.loginname}}</div>
                                <div>发布于{{getTime(topicDetail.create_at)}}</div>
                            </div>
                        </div>
                        <div class="right">
                            <span>{{topicDetail.visit_count}}次浏览</span>
                        </div>
                    </div>
                </div>
                <div class="detail" v-html="topicDetail.content" @click="findNodes"></div>
                <div class="comment-container">
                    <div class="comment-header">
                        <div class="comment-num">
                            共{{topicDetail.reply_count}}条回复
                        </div>
                        <TButton class="comment-btn" @click="showCommentModal">
                            点击评论
                        </TButton>
                    </div>
                    <div class="comment-content" v-if="!!replies.length">
                        <div v-for="comment in replies" class="comment-list">
                            <div class="comment-user">
                                <Timage
                                   class="user-avator"
                                   :src="getImgUri(comment)"
                                   @click="goUser(comment)">
                                </Timage>
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
                <button class="send-btn">
                    发布
                </button>
            </form>
        </Modal>
    </div>
</template>

<script>
    import { Modal,Timage} from './../components';
    import {mapActions, mapState} from 'vuex'
    import detailTypes from './../store/types/detail';

    const actions = mapActions({...detailTypes});
    export default {
        name: "detail",
        components: {
            Modal,
            Timage
        },
        data() {
            return {
                ...actions,
                isToTop: true,
                commentText: ``,
                modalShow: false,
                disabledRefresh: false,
            }
        },
        computed: {
            ...mapState({
                details: state => {
                    return state.detail
                },
                userState: state => state.user
            }),

            topicId(){
                const { params } = this.$route;
                return params.id;
            },

            topicDetail(){
                const { desc } = this.details;
                return desc[this.topicId]||{};
            },

            has(){
                const { topicDetail } = this;
                return !!Object.keys(topicDetail).length;
            },

            author(){
                const { author } = this.topicDetail;
                return author;
            },

            replies(){
                const { replies } = this.topicDetail;
                return replies;
            }
        },
        mounted() {
            this.networker = setTimeout(() => {
                this.getData();
            }, 600);
        },

        beforeDestroy() {
            this.networker && clearTimeout(this.networker);
        },

        methods: {
            getData(cb = () => {}) {
                return this.getDetail(this.topicId).then(cb)
            },
            onRefresh(cb) {
                this.getData().then(cb);
            },
            getTime: time => {
                return diffTime(time);
            },
            findNodes(e) {
                const target = e.target;
                if (target.nodeName === `IMG`) {
                    console.log(target.src)
                }
            },
            showCommentModal() {
                this.modalShow = !this.modalShow
            },

            getImgUri({author}){
                return author.avatar_url;
            },
            onSubmit() {
                let {commentText, userState} = this;
                commentText = trim(commentText);
                if (!commentText) {
                    return this.$PopUp.tip(`请输入评论`);
                }

                const isLogin = getUserLogin();

                if (!isLogin) {
                    return this.$openLogin(cb => {
                        cb();
                        this.commenting();

                    });
                }
                this.commenting();
            },
            commenting() {
                let {commentText, userState} = this;
                commentText=`${commentText} 来至 [酷炫的cnode社区](http://cnode.yutao2012.com/)`;
                const {access_token} = userState;
                loading(`发送中...`);
                this.$http.post(`/topic/${this.topicId}/replies`, {
                    accesstoken: access_token,
                    content: commentText
                }).then(() => {
                    this.$PopUp.toast(`评论成功！`);
                    this.getData();
                    this.commentText = ``;
                    this.showCommentModal();
                }).finally(loadingClose);
            },
            goUser(item) {
                const {loginname} = item.author;
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

                &:last-child {
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
        padding: 10px 0 10px 10px;
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
            resize: none;
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