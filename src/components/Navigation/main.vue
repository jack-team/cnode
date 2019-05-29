<template>
    <div class="navigation">
        <button class="back" @click="backFn"></button>
        <div class="title">{{title}}</div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {
        Emit,
        Prop,
        Watch,
        Component
    } from 'vue-property-decorator';

    import * as storage from './../../common/storage';

    @Component({
        name: `navigation`
    })
    export default class Navigation extends Vue {
        @Prop({default: ``}) title!: string;

        mounted() {
            this.onTitleChange(this.title);
        }

        private get paths() {
            return storage.get(storage.JUMP_PATH) as Array<string>;
        }

        private get routeName() {
            const {
                name
            } = this.$route;
            return name || ``;
        }

        private onDelete() {
            const newSet = new Set(this.paths);
            newSet.delete(this.routeName);
            storage.set(storage.JUMP_PATH, [...newSet]);
        }

        @Emit(`back`)
        private backFn() {
            if (!!this.paths.length) {
                this.onDelete();
                this.$router.back();
            }
            else {
                this.$router.replace(`/`);
            }
        }

        @Watch(`title`)
        onTitleChange(title:string) {
            document.title = title;
        }
    }
</script>

<style scoped lang="scss">
    .navigation {
        height: 48px;
        position: relative;
        background-color: #fff;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        box-shadow: 1px 1px 3px #ececec;
        z-index: 99;
    }

    .back {
        width: 48px;
        height: 48px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        background-image: url("./../../static/back@2x.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 48%;
        background-color: #fff;
        &:active {
            opacity: .7;
        }
    }

    .title {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 500;
        color: #333;
        padding: 0 56px;
        z-index: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
</style>