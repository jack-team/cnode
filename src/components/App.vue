<template>
    <div id="app-container">
        <router-view class="router-container"/>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {
        Component
    } from 'vue-property-decorator';

    @Component
    export default class App extends Vue {

    }
</script>

<style scoped lang="scss">
    #app-container {
        position: absolute;
        height: 100%;
        left: 0;
        right: 0;
        max-width: 640px;
        margin: auto;
        background-color: #fff;
    }
    .router-container {
        width: 100%;
        height: 100%;
    }
</style>