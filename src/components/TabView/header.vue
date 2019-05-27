<template>
    <div class="nav-bar">
        <div class="nav-bar-content">
            <div :key="i"
                 class="nav-item"
                 v-for="(tab,i) in tabs"
                 :class="getSelected(i)"
                 @click="onTabChange(i)"
            >
                <p class="nav-item-name">
                    {{tab.name}}
                </p>
            </div>
        </div>
        <div class="nav-line" :style="lineStyle"/>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import {
        Tab
    } from './index';

    import {
        Emit,
        Prop,
        Component
    } from 'vue-property-decorator';

    @Component
    export default class Main extends Vue {
        @Prop({default: []}) tabs!: Array<Tab>;
        @Prop({default: 0}) readonly page!: number;
        @Emit(`change`)
        onTabChange(i: number) {
            return i
        }

        get lineStyle() {
            const {
                length = 0
            } = this.tabs;
            return {
                width: `${1 / length * 100}%`,
                transform: this.translateX,
                WebKitTransform: this.translateX
            }
        }

        getSelected(i: number) {
            return i === this.page ? `active` : ``
        }

        get translateX() {
            return `translateX(${this.page * 100}%)`;
        }
    }
</script>

<style scoped lang="scss">
    @import "./../../common/var";

    .nav-bar {
        position: absolute;
        width: 100%;
        height: 48px;
        top: 0;
        left: 0;
        z-index: 4;
        background-color: #fff;
        border-bottom: 1px solid #ececec;
    }

    .nav-bar-content {
        display: flex;
        height: 100%;
    }

    .nav-item-name {
        font-size: 14px;
        color: #666;
    }

    .nav-item {
        flex: 1;
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        transition: color 1s $bezier;
        &.active {
            .nav-item-name {
                color: $color;
            }
        }
    }

    .nav-line {
        position: absolute;
        height: 2px;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform .4s ease-out;
        &::before {
            content: '';
            display: block;
            width: 60%;
            height: 100%;
            background: $linearColor;
            border-radius: 1px;
        }
    }
</style>