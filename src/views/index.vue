<template>
    <div class="ms-page" v-has-header>
        <THeader :showLeft="false" :title="title">
            <button class="menu-icon" slot="left" @click="()=>this.leftSlider=true"></button>
        </THeader>
        <TabBar :tableLabel="tableLabel" :page="page" :onChange="pageChange">
            <TabbarItem v-for="(tab,index) in tableLabel" :key="tab.name">
                <CenterContent v-if="!!savePage[`page_${index}`]" :category="tab.category"></CenterContent>
            </TabbarItem>
        </TabBar>
        <Modal :show="leftSlider" :opacity=".5" :position="'left'" :onClose="()=>this.leftSlider=false" :cubicBezier="'ease'">
            <Menu></Menu>
        </Modal>
    </div>
</template>
<script>
    import {
        TabBar,
        TabbarItem,
        MsHeader,
        Modal
    } from './../components';
    import Menu from './menu';
    import CenterContent from './center';
    export default {
        components: {
            TabBar,
            TabbarItem,
            Modal,
            CenterContent,
            Menu
        },
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
                title:'Cnode 社区',
                page:page,
                leftSlider:false,
                tableLabel:tableLabel,
                savePage:{[`page_${page}`]:`page_${page}`}
            }
        },
        methods: {
            pageChange(index){
                this.setIndexByPage(index);
                const { category } = this.tableLabel[index];
                this.$router.push(`/topic/${category}`);
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
                const pageIndex= (tableLabel||tabs).findIndex(tab=>tab.category===category);
                return pageIndex < 0 ? 0 : pageIndex;
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
</style>