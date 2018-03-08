<template>
    <div class="empty">
        你是猴子派来的逗比吗，哈哈！
    </div>
</template>

<script>
    export default {
        destroyed() {
            console.log('哎呀，我被销毁了！')
        }
    }
</script>

<style lang="scss" scoped>

    .empty {
        width: 300px;
        height: 50px;
        background: #000;
        text-align: center;
        line-height: 50px;
        color: #fff;
        border-radius: 4px;
    }

</style>