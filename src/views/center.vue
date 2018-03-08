<template>
    <ScrollView :onRefresh="onRefresh" :onEndReached="loadMore">
        <div v-for="(item , index ) in getList" class="item" :key="index" @click="jumpToPage">
            <div class="item-top">
                <div class="label">置顶</div>
                <div class="title">
                    {{item.title}}
                </div>
            </div>
            <div class="author">
                <div class="author-avator" :style="{backgroundImage:`url(${item.author.avatar_url})`}">

                </div>
            </div>
        </div>
    </ScrollView>
</template>

<script>
    import { ScrollView } from './../components';
    import { mapActions , mapState } from 'vuex'
    import homeTypes from './../store/types/home';
    const actions = mapActions({...homeTypes});
    export default {
        name: "center",
        props:{
            category:{
                type:String,
                default:`good`
            }
        },
        components:{
            ScrollView
        },
        data(){
            return {
                ...actions,
            }
        },
        computed: {
            ...mapState({
                home: state => {
                   return state.home
                }
            }),
            getList(){
                const {home , category } = this;
                return home[category].list;
            }

        },
        mounted(){
            this.loadData(`refresh`);
        },
        methods:{
            onRefresh(cb){
                this.loadData(`refresh`,cb);
            },
            loadMore(){
                this.loadData(`loadMore`);
            },
            loadData(type=`refresh`,cb=()=>{}){
                let { page = 0 } = this.home[this.category];
                page = type === `refresh` ? 0 : page + 1;
                this.getTopicList({
                    page:page,
                    category:this.category,
                    type:type
                }).finally(()=>{
                    cb();
                })
            },
            jumpToPage(){
                this.$modal.confrim(`提示`,`确定要删除信息吗？`)
            }
        }
    }
</script>

<style scoped lang="scss">
    $colorRed:#e74c3c;
    $green:#1abc9c;
    $blue:#3498db;
    $yellow:#e67e22;
    .item {
        padding: 10px;
        border-bottom: 1px solid #ececec;
        background-color: #fff;

        .item-top {
            display: flex;

            .label {
                color: #fff;
                font-size: 12px;
                background-color: $green;
                padding: 0 6px;
                border-radius:2px;
                line-height: 20px;
                height: 20px;
            }

            .title {
                flex: 1;
                font-size: 16px;
                margin-left: 6px;
            }
        }

        .author {
            display: flex;

            .author-avator {
                width: 40px;
                height: 40px;
                border-radius: 20px;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                border: 1px solid #ececec;
            }
        }
    }
</style>