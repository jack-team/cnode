<template>
    <div class="scene-view" :class="pageScene">
        <transition>
            <keep-alive include="Topics">
                <router-view class="router-container"/>
            </keep-alive>
        </transition>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import {
        Route
    } from 'vue-router';

    import {
        Watch,
        Component
    } from 'vue-property-decorator';
    import * as storage from './../common/storage';

    @Component({
        name: `Scene`
    })
    export default class Scene extends Vue {
        direction: string = ``;

        get pageScene() {
            return !!this.direction ? `page-${this.direction}` : ``;
        }

        getIndex(array: Array<string>, value: string) {
            return array.findIndex(item => item === value);
        }

        @Watch('$route')
        onRouteChange(a: Route, b: Route) {
            let paths: Array<string> = (
                storage.get(storage.JUMP_PATH) || []
            );
            const preName = b.name as string;
            const nextName = a.name as string;
            paths.push(...[preName, nextName]);
            paths = [...new Set(paths)];
            storage.set(storage.JUMP_PATH, paths);
            const preIndex = this.getIndex(paths, preName);
            const nextIndex = this.getIndex(paths, nextName);
            this.direction = nextIndex < preIndex ? `back` : `forward`;
        }
    }
</script>

<style lang="scss" scoped>
    .scene-view {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }

    .router-container {
        top: 0;
        left: 0;
        position: absolute;
        transition: all .5s cubic-bezier(.36, .66, .04, 1);
    }

    @mixin view-right() {
        transform: translate3d(100%, 0, 0);
    }

    @mixin view-left() {
        transform: translate3d(-100%, 0, 0);
    }

    @mixin view-center() {
        transform: translate3d(0, 0, 0);
    }

    .page-back {
        .v-enter {
            @include view-left();
            opacity: 0.5;
            z-index: 1;
        }
        .v-enter-to {
            @include view-center();
            opacity: 1;
            z-index: 1;
        }
        .v-leave {
            @include view-center();
            opacity: 1;
            z-index: 2;
        }
        .v-leave-active {
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        }
        .v-leave-to {
            @include view-right();
            opacity: 1;
            z-index: 2;
        }
    }

    .page-forward {
        .v-enter {
            @include view-right();
            opacity: 1;
            z-index: 2;
        }
        .v-enter-active {
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        }
        .v-enter-to {
            @include view-center();
            opacity: 1;
            z-index: 2;
        }
        .v-leave {
            @include view-center();
            opacity: 0.5;
            z-index: 1;
        }
        .v-leave-to {
            @include view-left();
            opacity: 0.5;
            z-index: 1;
        }
    }
</style>