<template>
    <div class="tip">
        {{message}}
    </div>
</template>
<script>
    export default {
        name: "tip",
        props:{
            message:{
                type:String,
                default:``
            }
        }
    }
</script>
<style scoped lang="scss">
    .tip {
        height: 45px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0,0,0,.15);
        line-height: 45px;
        padding: 0 20px 0 36px;
        font-size: 16px;
        color: #333;
        position: relative;
        &:before {
            content: '';
            display: block;
            position: absolute;
            left: 10px;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 20px;
            height: 20px;
            background-image: url("./tip_icon@2x.png");
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
    }
</style>