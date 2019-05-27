<template>
    <div class="confirm-modal">
        <p class="title">
            {{title}}
        </p>
        <p class="content-text">{{text}}</p>
        <div class="buttons">
            <button class="button" v-for="button in buttons" @click="onClick(button.onClick)">
                {{button.text}}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {
        Prop,
        Component
    } from 'vue-property-decorator';

    interface Button {
        text: string,
        color?: string,
        onClick?: Function
    }

    @Component
    export default class Confirm extends Vue {
        @Prop({default: {}}) dialog!: any;
        @Prop({default: ``}) title!: string;
        @Prop({default: ``}) text!: string;
        @Prop({default: []}) buttons!: Array<Button>;

        onClick(onClick: Function) {
            if (!onClick) {
                return false
            }
            const isClose = onClick() !== false;
            if (isClose) {
                this.dialog.close().then(this.dialog.destroy)
            }
        }
    }
</script>

<style scoped lang="scss">
    .confirm-modal {
        width: 75vw;
        overflow: hidden;
        border-radius: 8px;
        background-color: #fff;
        padding: 20px 16px 0 16px;

        .title {
            color: #333;
            font-size: 16px;
            text-align: center;
            padding-bottom: 20px;
        }

        .buttons {
            display: flex;
            margin: 0 -16px;
            overflow: hidden;
            border-top: 1px solid #ececec;

            .button {
                height: 42px;
                display: block;
                flex: 1;
                font-size: 14px;
                color: #333;
                background-color: #fff;
                border-right: 1px solid #ececec;
                &:last-child {
                    border-right: none;
                }

                &:active {
                    background-color: #f2f2f2;
                }
            }
        }

        .content-text {
            text-align: center;
            font-size: 14px;
            color: #666;
            padding-bottom: 20px;
        }
    }
</style>