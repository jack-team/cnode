<template>
    <div class="loading"></div>
</template>

<script>
    export default {
        name: "loading"
    }
</script>

<style scoped lang="scss">
    .loading {
        width: 24px;
        height: 24px;
        background-image: url("./loading.gif");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
</style>