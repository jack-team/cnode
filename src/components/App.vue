
<template>
    <div id="app" @touchmove.prevent>
        <router-view></router-view>
    </div>
</template>

<script type="es6">
    export default {}
</script>
<style lang="scss">
    body {
        background-color: #555;
    }
    #app {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
        width: 100%;
        margin: auto;
        max-width: 640px;
        height: 100%;
        background-color: #f2f2f2;
        overflow: hidden;
    }
</style>