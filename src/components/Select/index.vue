<template>
    <div class="select-container" @click="openModal" :class="getStyle">
        <input type="text" readonly :value="valueName" >
    </div>
</template>

<script>
    import Option from './Option';
    export default {
        data(){
            return {
                show:false,
                currentValue:this.value
            }
        },
        props:{
            title:{
                type:String,
                default:`请选择`
            },
            options:{
                type:Array,
                default:()=>[]
            },
            value:{
                type:String,
                default:``
            }
        },
        computed:{
            getStyle(){
                return {
                    show:this.show
                }
            },
            valueName(){
                const { options , currentValue } = this;
                const { name } = options.find(({ value }) => value === currentValue) || {};
                return name;
            }
        },
        methods:{
            openModal(){
                const { title , options , currentValue } = this;
                this.show = true;
                const modal = this.$PopUp.show(Option,{
                    position:`bottom`,
                    opacity:.6,
                    maskDuration:300,
                    contentDuration:300,
                },{
                    options:options,
                    title:title,
                    selectedValue:currentValue,
                    change:( value ) => {
                        this.currentValue = value;
                        this.$emit('input', value);
                        this.onClose(modal);
                    }
                });
                modal.onClose=()=>this.onClose(modal);
            },
            onClose(modal){
                modal.show = false;
                this.$nextTick(() => {
                    this.show = false;
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .select-container {
        width: 100%;
        height: 40px;
        overflow: hidden;
        padding: 0 10px;
        background-color: #fff;
        border-radius: 2px;
        position: relative;
        border: 1px solid #ccc;
        input {
            width: 100%;
            height: 100%;
            color: #666;
        }
        &:after {
            content: '';
            width: 0;
            height: 0;
            border-top: 6px solid #aaa;
            border-right: 6px solid transparent;
            border-left: 6px solid transparent;
            position: absolute;
            right: 10px;
            top: 0;
            bottom: 0;
            margin: auto;
            transition: all .3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        &.show {
            &:after {
                transform: rotate(180deg);
            }
        }
    }
</style>