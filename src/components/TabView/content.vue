<template>
    <div class="tab-view-content" :style="curStyle">
        <slot v-if="isCreated"></slot>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {
        Component
    } from 'vue-property-decorator';
    @Component
    export default class Content extends Vue {
        isShow: boolean = false;
        isCreated: boolean = false;
        nodeCount: number = 0;
        scrollX: boolean = true;

        get curStyle(): object {
            return {
                opacity: this.isShow ? 1 : 0,
                [this.scrollX ? `width` : `height`]: `${1 / this.nodeCount * 100}%`
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "./../../common/var";
    .tab-view-content {
        height: 100%;
        transition: opacity 1s $bezier;
    }
</style>