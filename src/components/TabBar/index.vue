<template>
    <div class="ms-tabbar" :class="positionClass">
        <div class="ms-tabbar-header">
            <div class="ms-tabbar-header-container">
                <div class="ms-tabbar-tab" v-for="(tab,index) in tableLabel" :key="tab.name" @click="changeTab(index)" :class="tabActive(index)">
                    <span class="label-text">
                        {{tab.name}}
                    </span>
                </div>
            </div>
            <div class="scroll-border" :style="getStyle"></div>
        </div>
        <div class="ms-tabbar-content">
            <div class="content-ani" :style="getContentStyle">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tabview",
        props:{
            position:{
                type:String,
                default:`top`,
                validator(value) {
                    const vali = [`top`, `bottom`];
                    return vali.includes(value);
                }
            },

            tableLabel:{
                type:Array,
                default:()=>[]
            },

            page:{
                type:Number,
                default:0
            },
            onChange:{
                type:Function,
                default:()=>{}
            },
            hasLine:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {}
        },
        mounted(){

        },
        updated(a,b){

        },
        computed:{
            positionClass(){
                const { position } = this;
                return { [position]:true }
            },
            getStyle(){
                const { tableLabel , page } = this;
                return {
                    width:`${1/tableLabel.length*100}%`,
                    transform:`translateX(${page*100}%)`,
                    '-webkit-transform':`translateX(${page*100}%)`
                }
            },
            getContentStyle(){
                const { tableLabel , page } = this;
                return {
                    width:`${tableLabel.length*100}%`,
                    transform:`translateX(-${(page/tableLabel.length)*100}%)`,
                    '-webkit-transform':`translateX(-${(page/tableLabel.length)*100}%)`
                }
            }
        },
        methods:{
            changeTab(index){
               this.onChange(index);
            },
            tabActive( index ) {
                return {
                    active:this.page===index,
                    [`no-line`]:!this.hasLine
                }
            }
        },
        watch:{

        }
    }
</script>

<style scoped lang="scss">
    .ms-tabbar {

        height: 100%;
        width: 100%;
        position: relative;

        .ms-tabbar-header {
            height: 48px;
            position: absolute;
            left:0;
            width: 100%;
            background: #fff;
            border-bottom: 1px solid #ececec;
            .ms-tabbar-header-container {
                width: 100%;
                height: 100%;
                display: flex;
            }
        }

        .scroll-border {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;

            transition: all .3s cubic-bezier(0.23, 1, 0.32, 1);

            &:before {
                content: "";
                display: block;
                height: 100%;
                width: 70%;
                margin: auto;
                background-color: #FF5655;
            }
        }

        .ms-tabbar-tab {
            flex:1;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            font-size: 14px;
            color:#888;
            position: relative;

            &:after {
                content: '';
                height: 60%;
                position: absolute;
                right: 0;
                display: block;
                width: 1px;
                top: 0;
                bottom: 0;
                margin: auto;
                background: #ccc;
            }

            &:last-child {
                &:after{
                    width: 0;
                }
            }



            .icon {
                width: 24px;
                height: 24px;
                margin-bottom: 4px;
            }

            &.active {
                color:#FF5655;
            }

            .label-text {
                display: block;
            }

            &.no-line{
                &:after{
                    width: 0;
                }
            }
        }

        &.top {
            padding-top: 48px;
            .ms-tabbar-header {
                top:0;
            }
        }

        &.bottom {
            padding-bottom: 48px;
            .ms-tabbar-header {
                bottom: 0;
            }

            .ms-tabbar-tab {
                font-size: 12px;
            }
        }

        .ms-tabbar-content {
            width: 100%;
            height: 100%;
            position: relative;
            /*overflow: hidden;*/

        }

        .content-ani {
            height: 100%;
            position: relative;
            /*transition: all .3s cubic-bezier(0.23, 1, 0.32, 1);*/
        }
    }

</style>