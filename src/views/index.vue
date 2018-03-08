<template>
    <div class="ms-page" v-has-header>
        <ms-header :showLeft="false">
            <button class="menu-icon" slot="left" @click="openSlider"></button>

        </ms-header>
        <tab-bar :tableLabel="tableLabel" :page="page" :onChange="pageChange">
            <tabbar-item v-for="(tab,index) in tableLabel" :key="tab.name">
                <center-content v-if="!!savePage[`page_${index}`]" :category="tab.category"></center-content>
            </tabbar-item>
        </tab-bar>
        <modal :show="rightSlider" :position="'left'" :onClose="()=>this.rightSlider=false">
            <div class="right-menu"></div>
        </modal>
    </div>
</template>

<script>

    import {
        TabBar,
        TabbarItem,
        MsHeader,
        Modal
    } from './../components';

    import CenterContent from './center';

    export default {
        components: {
            MsHeader,
            TabBar,
            TabbarItem,
            Modal,
            CenterContent
        },

        computed:{},

        data() {
            const tableLabel = [
                { name:"精华",category:"good" },
                { name:"分享",category:"share" },
                { name:"问答",category:"ask" },
                { name:"招聘",category:"job" },
                { name:"测试",category:"dev" }
            ];
            const page = this.getCategoryToPage(tableLabel);
            return {
                title:'首页',
                page:page,
                rightSlider:false,
                tableLabel:tableLabel,
                savePage:{[`page_${page}`]:`page_${page}`}
            }
        },

        created() {

        },

        mounted() {


        },

        beforeMount() {

        },

        beforeDestroy() {

        },

        methods: {
            openSlider(){
                this.rightSlider=true
            },

            pageChange(index){
                this.setIndexByPage(index);
                const { category } = this.tableLabel[index];
                this.$router.push(category);
            },

            setIndexByPage( index ){
                this.savePage[`page_${index}`]=`page_${index}`;
                this.page=index;
            },

            getCategoryToPage(tabs=[]){
                const { currentRoute } = this.$router;
                const { params } = currentRoute;
                const { category } = params;
                const { tableLabel } = this;
                return (tableLabel||tabs).findIndex(tab=>tab.category===category);
            }
        },
        watch:{
            '$route' () {
                const page = this.getCategoryToPage();
                this.setIndexByPage(page);
            }
        }

    }
</script>

<style lang="scss" scoped>
    .menu-icon {
        width: 52px;
        height: 34px;
        background-color: transparent;
        background-image: url("./../image/menu_icon@2x.png");
        background-size: auto 76%;
        background-repeat: no-repeat;
        background-position:center;
        &:active {
            opacity: .5;
        }
    }

    .right-menu {
        width: 160px;
        height: 100%;
        background: #fff;
    }

</style>