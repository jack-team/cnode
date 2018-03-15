<template>
    <div class="option-container">
        <div class="title">
            {{title}}
        </div>
        <scroll-view :disabledRefresh="true">
            <div class="option-wrapper">
                <div class="option" v-for="(option,index) in options" @click="onSelect(option)" :class="activeClass(index)">
                    {{option.name}}
                </div>
            </div>
        </scroll-view>
    </div>
</template>
<script>

    export default {
        name: "select-option",
        props:{
            options:{
                type:Array,
                default:()=>[]
            },
            change:{
                type:Function,
                default:()=>{}
            },
            title:{
                type:String,
                default:``
            },
            selectedValue:{
                type:String,
                default:``
            }
        },
        computed:{

        },
        methods:{
            onSelect(opt){
                this.change(opt.value);
            },
            activeClass(index){
                const { options , selectedValue } = this;
                const findIndex = options.findIndex(({value})=>value===selectedValue);
                return {
                    active:index===findIndex
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .option-container {
        height: 200px;
        background-color: #fff;
        border-top: 1px solid #FF5655;
        position: relative;
        padding-top: 45px;
    }

    .option-wrapper {
        padding: 0 10px;
    }

    .title {
        color: #444;
        height: 45px;
        width: 100%;
        font-weight: 500;
        line-height: 45px;
        text-align: center;
        border-bottom: 1px solid #ececec;
        position: absolute;
        top: 0;
        left: 0;
    }

    .option {
        padding: 12px 20px;
        border-bottom: 1px solid #ececec;
        &:last-child{
            border-bottom: none;
        }

        &:active {
            background-color: #f6f6f6;
        }

        &.active {
            background-color: #f6f6f6;
        }
    }

</style>