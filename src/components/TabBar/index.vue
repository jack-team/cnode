<template>
    <div class="ms-tabbar" :class="reversedClass">
        <div class="ms-tabbar-header">
            <div class="ms-tabbar-header-container">
                <div
                   class="ms-tabbar-tab"
                   v-for="(tab,index ) in tableLabel"
                   :key="index"
                   @click="changeTab(index)"
                   :class="tabActive(index)"
                >
                    <img
                       class="icon"
                       v-if="!!tab.icon"
                       :src="getTabIcon(tab,index)"
                    />
                    <span class="label-text">
                        {{tab.label}}
                    </span>
                </div>
            </div>
            <div class="scroll-border" :style="getStyle"></div>
        </div>
        <div class="ms-tabbar-content">
            <div class="aa"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tabview",
        props:{
            position:{
                type:String,
                default:`top`
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
            }
        },
        data(){
            return {}
        },
        computed:{
            reversedClass(){
                const { position } = this;
                return position !== `bottom` ? `top` : `bottom`;
            },
            getStyle(){
                const { tableLabel , page } = this;
                return {
                    width:`${1/tableLabel.length*100}%`,
                    transform:`translateX(${page*100}%)`,
                    '-webkit-transform':`translateX(${page*100}%)`
                }
            }
        },
        methods:{
            changeTab(index){
               this.onChange(index);
            },
            tabActive( index ) {
                return index === this.page ? `active`:``
            },
            getTabIcon( tab, index ){
                const { icon , activeIcon } = tab;
                return index === this.page ? activeIcon : icon;
            }
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
            background-color: #1abc9c;
            transition: all .3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .ms-tabbar-tab {
            flex:1;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            font-size: 14px;
            color:#888;

            .icon {
                width: 24px;
                height: 24px;
                margin-bottom: 4px;
            }

            &.active {
                color:#1abc9c;
            }

            .label-text {
                display: block;
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
        }
    }

</style>