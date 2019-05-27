<template>
    <div class="page-content">
        <ScrollView
           :page="curPage"
           v-model="myScroll"
           :pageSize="pageSize"
           @onLoadMore="onLoadMore"
           @onRefresh="onRefresh"
           @scroll="onScroll"
        >
            <ul class="items">
                <Item v-for="(item,i) in queryList" :itemData="item" :key="i"/>
            </ul>
        </ScrollView>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import {
        State,
        Action
    } from 'vuex-class';

    import {
        Prop,
        Component
    } from 'vue-property-decorator';

    import {
        ScrollViewUp,
    } from './../../components';

    import {
        DataNode,
        TopicData,
        TopicsStateContent
    } from '../../state/interface/topics';

    import Item from './item.vue';

    import * as types from '../../state/types/topics';

    @Component({
        components: {
            Item
        }
    })
    export default class PageContent extends Vue {
        @Prop({default: ``}) tab!: string;
        @Action(types.getTopicList) getTopicList!: Function;
        @State(({topics}) => topics.tabData) topics!: TopicsStateContent;

        pageSize: number = 20;

        scrollY: number = 0;

        myScroll: any = {};

        isFirstLoading:boolean = true;

        get curPage() {
            const {
                page = 0
            } = this.curTab;
            return page;
        }

        get curTab() {
            return (this.topics[this.tab] || {}) as TopicData;
        }

        get queryList() {
            const {
                list = []
            } = this.curTab;
            return list as Array<DataNode>;
        }

        async onRefresh(cb: Function) {
            const e: ScrollViewUp = {
                num: 1,
                time: null,
                size: this.pageSize
            }
            try {
                await this.onLoadMore(e, cb);
            }
            catch (e) {}
        }

        async onLoadMore(e: ScrollViewUp, cb: Function) {
            const payLoad = {
                tab: this.tab,
                page: e.num,
                limit: e.size
            }

            if(this.isFirstLoading) {
                this.isFirstLoading = false;
                if(!!this.queryList.length) {
                    return cb(this.pageSize)
                }
            }
            try {
                const List = (
                    await this.getTopicList(payLoad)
                )
                cb(List.length)
            }
            catch (e) {
                return Promise.reject(e)
            }
        }

        onScroll(y: number) {
            this.scrollY = y;
        }

        activated() {
            this.myScroll.scrollTo(this.scrollY, 0)
        }
    }
</script>

<style scoped lang="scss">
    .page-content {
        height: 100%;
        background-color: #f2f2f2;
    }

    .items {

    }
</style>