<template>
    <div class="empty">
        <i class="empty-icon bg-common"></i>
        <div class="message">{{message}}</div>
    </div>
</template>

<script>
    export default {
        name: "empty",
        props:{
            message:{
                type:String,
                default:`暂无数据`
            }
        }
    }
</script>

<style scoped lang="scss">
    .empty {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding-bottom: 34px;

        .empty-icon {
            display: block;
            width: 200px;
            height: 200px;
            background-image: url("./gra_nomsg@2x.png");
        }

        .message {
            font-size: 16px;
            color: #888;
            margin-top: 10px;
        }
    }

</style>