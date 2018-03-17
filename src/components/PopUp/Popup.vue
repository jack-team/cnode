<template>
    <div class="popup-container">
        <div class="content">
            <div class="title" v-if="!!title">
                {{title}}
            </div>
            <div class="msg-text" v-if="!!message">
                <span>
                     {{message}}
                </span>
            </div>
        </div>
        <div class="button-group">
            <div v-for="btn in buttons" class="button" @click="btnClick(btn)">
                {{btn.text}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "popup",
        props: {
            buttons: {
                type: Array,
                default: () => []
            },
            title: {
                type: String,
                default: `提示`
            },
            message: {
                type: String,
                default: ``
            },
            handelClick: {
                type: Function,
                default: () => {}
            }
        },
        methods: {
            btnClick(btn) {
                const {onClick = () => null} = btn || {};
                onClick() !== false && this.handelClick();
            }
        }
    }
</script>

<style scoped lang="scss">
    .popup-container {

        width: 280px;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;

        .content {

            padding: 20px;
            .title {
                font-family: sans-serif;
                color: #000;
                font-size: 16px;
                font-weight: 600;
                text-align: center;
            }

            .msg-text {
                margin-top: 10px;
                font-size: 13px;
                line-height: 13px;
                font-weight: 400;

                span {
                    display: block;
                }

                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        .button-group {
            height: 45px;
            display: flex;
            width: 100%;
            border-top: 1px solid #ececec;
        }

        .button {

            flex: 1;
            display: block;
            background-color: #fff;
            color: #4a90e2;
            font-size: 16px;
            height: 100%;
            text-align: center;
            line-height: 45px;
            border-right: 1px solid #ececec;

            &:last-child {
                border-right: none
            }

            &:active {
                background-color: #ececec;
                color: #fff;
            }
        }

    }
</style>