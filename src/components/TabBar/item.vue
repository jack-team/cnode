<template>
    <div class="tab-bar-item" bar-item v-bar-item>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "item",
        props:{
            pageIndex:{
                type:Number,
                default:0
            }
        },
        data(){
            return{
                hhhhh:'1'
            }
        }
    }
</script>

<style scoped lang="scss">
    .tab-bar-item {
       position: absolute;
       left: 0;
       height: 100%;
    }
</style>