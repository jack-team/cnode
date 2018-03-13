<template>
    <button class="button" @click="e=>this.$emit('click',e)">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "ms-button"
    }
</script>

<style scoped lang="less">
    .button {
        background: linear-gradient(to right, #FF7A4C, #FF5655);
        color: #fff;
        &:active {
            background:#FF5655;
        }
    }
</style>