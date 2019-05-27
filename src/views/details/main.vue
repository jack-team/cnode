<template>
    <div class="page">
        <ScrollView
            v-if="!!topicId && !!detail"
            :useLoadMore="false"
            @onRefresh="onRefresh"
        >
            <div class="header">
               <h2 class="title">{{title}}</h2>
                <p class="sc-title">
                    <span>{{createTime}}</span>
                    <span>{{authorName}}</span>
                    <span>{{visitCount}}</span>
                </p>
            </div>
            <div v-html="content" class="content-html"></div>
            <div class="main" v-if="!!replyCount">
                <div class="comment-header">
                    <p>{{replyCount}}条回复</p>
                </div>
                <ul class="comments">
                    <li v-for="(item,i) in comments" :key="i">
                        <Avatar
                           :size="36"
                           :url="item.author.avatar_url"
                        />
                        <div class="comment-content">
                            <p class="comment-title">
                                {{item.author.loginname}}
                                {{getCreateTime(item.create_at)}}
                            </p>
                            <div
                               class="comment-html"
                               v-html="item.content"
                            />
                        </div>
                    </li>
                </ul>
            </div>
        </ScrollView>
        <Loading v-else/>
    </div>
</template>

<script lang="ts">
   import Vue from 'vue';

   import {
       Component
   } from 'vue-property-decorator';

   import {
       State,
       Action
   } from 'vuex-class';

   import * as types from './../../state/types/details';

   import {
       DetailsData,
       DetailsStateContent
   } from './../../state/interface/details';

   import {
       getTimeFromNow
   } from './../../common/utils';

   import {
       Avatar
   } from './../../components'

   @Component({
       components:{
           Avatar
       }
   })
   export default class Details extends Vue {
       @Action(types.getDetailById) getDetailById!:Function;
       @State(({ details }) => details.detail ) details!:DetailsStateContent;

       get topicId():string {
           const {
               params
           } = this.$route;
           const {
               id
           } = params;
           return id;
       }

       mounted() {
           this.onLoad()
       }

       onLoad() {
           return this.getDetailById(this.topicId).
           then(() => document.title = this.title);
       }

       async onRefresh(cb:Function) {
           try {
               await this.onLoad();
           }
           catch (e) {
               console.log(e)
           }
           cb()
       }

       get detail():DetailsData {
           return this.details[this.topicId];
       }

       get content():string {
           const {
               content
           } = this.detail;
           return content
       }

       get title():string {
           const {
               title = ``
           } = this.detail;
           return title;
       }

       get comments() {
           const {
               replies
           } = this.detail;
           return replies;
       }

       get createTime():string {
           const {
               create_at
           } = this.detail;
           return `发布于 ${getTimeFromNow(create_at)}`;
       }

       getCreateTime(date:Date):string {
           return getTimeFromNow(date);
       }

       get authorName() {
           const {
               author
           } = this.detail;
           const {
               loginname
           } = author;
           return `作者 ${loginname}`
       }

       get visitCount() {
           const {
               visit_count
           } = this.detail;
           return `${visit_count} 次浏览`;
       }

       get replyCount():number {
           const {
               reply_count
           } = this.detail;
           return reply_count;
       }
   }
</script>

<style lang="scss">
    @import "./../../common/markdown";
</style>

<style scoped lang="scss">
    .page {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #f2f2f2;
    }

    .title {
        color: #333;
        font-weight: 500;
        margin-bottom: 10px;
        line-height: 28px;
    }

    .header {
        padding: 18px 16px;
        background-color: #fff;
    }

    .content-html {
        padding-top: 6px;
    }

    .main {
        margin-top: 6px;
        background-color: #fff;
    }

    .sc-title {
        color: #999;
        font-size: 12px;
        span {
            &:before {
                content: '•';
                margin-right: 2px;
            }
        }
    }

    .comment-header {
        display: flex;
        padding: 12px;
        margin-bottom: 20px;
        font-size: 16px;
        color: #333;
        * {
            display: block;
        }
    }

    .comments {
        li {
            display: flex;
            padding-left: 12px;
            margin-bottom: 12px;
            border-bottom: 1px solid #ececec;
        }
        .comment-content {
            flex: 1;
        }
        .comment-title {
            padding-left: 12px;
            font-size: 14px;
            color: #333;
            font-weight: 500;
        }
    }
</style>