<template>
    <div class="page">
        <Header :tabs="tabs" :page="curPage" @change="onPageChange"/>
        <TabView :page="curPage">
            <TabContent :key="i" v-for="(tab,i) in tabs">
                <Pager :tab="tab.id"/>
            </TabContent>
        </TabView>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {
        TabView
    } from '../../components';

    const {
        Header,
        Content,
        Container
    } = TabView;

    import {
        Component
    } from 'vue-property-decorator';

    import {
        Tab
    } from './../../components/TabView';

    import Pager from './pager.vue';

    @Component({
        name:`Topics`,
        components: {
            Header,
            Pager,
            TabContent:Content,
            TabView:Container,
        }
    })
    export default class Topic extends Vue {
        tabs: Array<Tab> = ([
            {id: `all`, name: `全部`},
            {id: `good`, name: `精华`},
            {id: `share`, name: `分享`},
            {id: `ask`, name: `问答`},
            {id: `job`, name: `招聘`},
            {id: `dev`, name: `测试`}
        ])

        get curPage() {
            return this.getPageByTab(this.tabId)
        }

        get tabId():string {
            const {
                params
            } = this.$route;
            const {
                tab = ``
            } = params;
            return tab
        }

        getPageByTab(tab:string):number {
            const page = this.tabs.findIndex(({id}) => id === tab);
            return page < 0 ? 0 :page;
        }

        getTabByPage(page:number):string {
            const {
                id
            } = this.tabs[page] as Tab;
            return id;
        }

        onPageChange(page:number) {
            const tab = this.getTabByPage(page);
            this.$router.push(`/topic/${tab}`);
        }
    }
</script>

<style scoped lang="scss">
    @import "./../../common/var.scss";

    .page {
        height: 100%;
        padding-top: 48px;
        position: relative;
    }
</style>