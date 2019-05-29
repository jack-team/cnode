<template>
    <div class="page">
        <Navigation :title="title"/>
        <Loading v-if="isLoading"/>
        <ScrollView v-else :useLoadMore="false" @onRefresh="onRefresh">
            <div class="container" ref="wrapper">
                <div class="header">
                    <h2 class="title">
                        {{title}}
                    </h2>
                    <div class="base-info">
                        <Avatar :url="authorAvatar" :size="28"/>
                        <p class="sc-title">
                            <span>{{createTime}}</span>
                            <span>{{authorName}}</span>
                            <span>{{visitCount}}</span>
                        </p>
                    </div>
                </div>
                <div v-html="content" class="content-html"></div>
                <div class="main" v-if="!!replyCount">
                    <div class="comment-header">
                        <p>{{replyCount}}条回复</p>
                    </div>
                    <ul class="comments">
                        <li :key="i" v-for="(item,i) in comments">
                            <Avatar :size="36" :url="item.author.avatar_url"/>
                            <div class="comment-content">
                                <p class="comment-title">
                                    {{item.author.loginname}}
                                    {{getCreateTime(item.create_at)}}
                                </p>
                                <div class="comment-html" v-html="item.content"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </ScrollView>
        <ImageSlide :items="items" :show="openSlide" :index="slideIndex" @close="onCloseImage"/>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import {
        State,
        Action
    } from 'vuex-class';

    import {
        Avatar,
        ImageSlide,
        Navigation
    } from './../../components';

    import {
        getTimeFromNow
    } from './../../common/utils';

    import {
        Component
    } from 'vue-property-decorator';

    import {
        DetailsData,
        DetailsStateContent
    } from './../../state/interface/details';

    import * as types from './../../state/types/details';

    @Component({
        components: {
            Avatar,
            ImageSlide,
            Navigation
        }
    })
    export default class Details extends Vue {
        @Action(types.getDetailById) getDetailById!: Function;
        @State(({details}) => details.detail) details!: DetailsStateContent;

        private openSlide: boolean = false;
        private items: Array<any> = [];
        private slideIndex: number = 0;

        private get topicId(): string {
            const {
                params = {}
            } = this.$route;
            return params.id;
        }

        private created() {
            this.onClickEvent = this.onClickEvent.bind(this);
        }

        private async mounted() {
            try {
                await this.onLoad();
                this.bindImageClick();
            }
            catch (e) {
                console.log(e)
            }
        }

        private get container(): Element {
            const {
                wrapper
            } = this.$refs;
            return wrapper as Element;
        }

        private bindImageClick() {
            this.container.addEventListener(
                `click`,
                this.onClickEvent
            );
        }

        private unBindImageClick() {
            this.container.removeEventListener(
                `click`,
                this.onClickEvent
            );
        }

        private get allImage(): Array<Element> {
            return [...this.container.querySelectorAll(`img`)];
        }

        onClickEvent(e: MouseEvent) {
            const dom = e.target as Element;
            if (dom.tagName.toLocaleUpperCase() === `IMG`) {
                this.onClickImages(dom);
            }
        }

        private currentIndex(target: Element): number {
            return this.allImage.findIndex(e => e === target);
        }

        onClickImages(target: Element) {
            const items = (
                this.allImage.map((img: any) => {
                    const {
                        src,
                        naturalWidth,
                        naturalHeight
                    } = img;
                    return {
                        src: src,
                        w: naturalWidth,
                        h: naturalHeight
                    }
                })
            )
            this.items = items;
            this.openSlide = true;
            this.slideIndex = this.currentIndex(target);
        }

        async onLoad() {
            return this.getDetailById(this.topicId)
        }

        async onRefresh(cb: Function) {
            try {
                await this.onLoad();
            }
            catch (e) {
                console.log(e)
            }
            cb()
        }

        get detail(): any | DetailsData {
            return this.details[this.topicId] || {};
        }

        get isLoading(): boolean {
            return !this.details[this.topicId];
        }

        get content(): string {
            const {
                content
            } = this.detail;
            return content
        }

        get title(): string {
            const {
                title = `CNode: Node.js 专业技术社区`
            } = this.detail;
            return title;
        }

        get comments() {
            const {
                replies
            } = this.detail;
            return replies;
        }

        get createTime(): string {
            const {
                create_at
            } = this.detail;
            return `发布于 ${getTimeFromNow(create_at)}`;
        }

        getCreateTime(date: Date): string {
            return getTimeFromNow(date);
        }

        get authorName() {
            const {
                author = {}
            } = this.detail;
            const {
                loginname
            } = author;
            return `作者 ${loginname}`
        }

        get authorAvatar() {
            const {
                author = {}
            } = this.detail;
            const {
                avatar_url
            } = author;
            return avatar_url;
        }

        get visitCount() {
            const {
                visit_count
            } = this.detail;
            return `${visit_count} 次浏览`;
        }

        get replyCount(): number {
            const {
                reply_count
            } = this.detail;
            return reply_count;
        }

        private onCloseImage() {
            this.openSlide = false;
        }

        private beforeDestroy() {
            this.unBindImageClick();
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
        padding-top: 48px;
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

    .base-info {
        display: flex;
        align-items: center;
        flex-direction: row;
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
        margin-left: 8px;
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