<template>
    <div class="lazy-view-container">
        <Loading v-if="!Element"/>
        <component :is="Element.default" v-else/>
    </div>
</template>

<script lang="ts">
    import Vue,{
        VNode
    } from 'vue';

    import {
        Prop,
        Component
    } from 'vue-property-decorator';

    @Component
    export default class LazyView extends Vue {
        @Prop({default:() => {}}) LazyFn!:Function;
        Element:any = null;
        loadFail:boolean = false;
        mounted() {
            this.loadComp();
        }
        async loadComp() {
            this.LazyFn().
            then((node:VNode) => {
                this.Element = node;
            }).
            catch(() => {
                this.loadFail = true;
            })
        }
    }
</script>

<style scoped lang="scss">
    .lazy-view-container {
        width: 100%;
        height: 100%;
    }
</style>