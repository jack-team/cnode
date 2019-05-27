<template>
    <li class="item" @click="goDetail">
        <p class="title">
            <span class="tag" v-if="!!tagName">
                {{tagName}}
            </span>
            <span class="text">
                {{itemData.title}}
            </span>
        </p>
        <div class="desc">
            <img :src="avatarUrl" class="avatar"/>
            <div class="content">
                <div>
                    {{userName}}{{submitTime}}
                </div>
                <div>{{visitCount}}人浏览</div>
            </div>
        </div>
    </li>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {
        Prop,
        Component
    } from 'vue-property-decorator';

    import {
        DataNode
    } from '../../state/interface/topics';

    interface Tag {
        [propName: string]: string;
    }

    import * as utils from '../../common/utils';

    const tags = {
        good:`精华`,
        share:`分享`,
        ask:`问答`,
        job:`招聘`,
        dev:`测试`
    } as Tag;

    @Component
    export default class Item extends Vue {
        @Prop({default:() => {}}) itemData!:DataNode
        get avatarUrl() {
            const {
                author
            } = this.itemData;
            const {
                avatar_url
            } = author;
            return avatar_url;
        }

        get tagName():string{
            const {
                tab,
                top
            } = this.itemData;
            return top ? `置顶` :tags[tab];
        }

        get userName():string {
            const {
                author
            } = this.itemData;
            const {
                loginname = ``
            } = author;
            return loginname;
        }

        get submitTime():string {
            const {
                create_at
            } = this.itemData
            return ` • 发布于${utils.getTimeFromNow(create_at)}`
        }

        get visitCount():number {
            const {
                visit_count = 0
            } = this.itemData
            return visit_count;
        }

        goDetail() {
            const {
                id
            } = this.itemData;
            this.$router.push(`/details/${id}`)
        }
    }
</script>

<style scoped lang="scss">
    @import "./../../common/var";

    .item {
        padding: 16px 16px;
        background-color: #fff;
        border-bottom: 1px solid #ececec;
        transition: background .3s $bezier ;
        &:active {
            background: #f2f2f2;
        }
    }

    .avatar {
        width: 24px;
        height: 24px;
        margin-right: 6px;
        border-radius: 12px;
        border: 1px solid #f2f2f2;
    }

    .title {
        color: #353535;
        font-size: 15px;
        line-height: 21px;
        margin-bottom: 16px;
        font-weight: 500;
    }

    .desc {
        display: flex;
        align-items: center;
    }

    .content {
        flex: 1;
        display: flex;
        font-size: 13px;
        color: #888;
        justify-content: space-between;
    }

    .text {
        margin-left: 4px;
    }

    .tag {
        display: inline-block;
        font-size: 12px;
        color: #fff;
        padding: 0 6px;
        height: 18px;
        line-height: 18px;
        border-radius: 4px;
        background:$linearColor;
    }
</style>