<template>
    <div class="ms-header">
        <div class="ms-header-container">
            <div class="ms-header-left">
                <slot name="left">
                    <button class="ms-header-back" @click="_goBack" v-if="showLeft">
                        <i class="icon icon-back" :class="{'icon-close':close}"></i>
                    </button>
                </slot>
            </div>
            <div class="ms-header-content">
                <slot name="center">
                    <p class="title">{{title}}</p>
                </slot>
            </div>
            <div class="ms-header-right">
                <slot name="right"></slot>
            </div>
        </div>
        <div class="bottom">
            <slot name="bottom"></slot>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "ms-header",
        props: {
            title: {
                type: String,
                default: `标题`
            },
            showLeft: {
                type: Boolean,
                default: true
            },
            goBack: {
                type: Function,
                default: cb => cb()
            },
            close: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapState({
                userPath: ({user}) => user.userPath
            })
        },
        methods: {
            _goBack() {
                const len = this.userPath.length;
                if(!this.close) {
                    if (!len || len === 1) {
                        return this.$router.replace(`/`);
                    }
                }
                this.goBack(() => this.$router.back())
            }
        }
    }
</script>

<style scoped lang="scss">

    .ms-header {
        width: 100%;
        min-height: 44px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        background: linear-gradient(to right, #FF7A4C, #FF5655);

        .ms-header-container {
            width: 100%;
            height: 44px;
            position: relative;
        }

        .ms-header-left, .ms-header-right {
            position: absolute;
            top: 0;
            padding: 5px 0;
            height: 100%;
            z-index: 1;
        }

        .ms-header-left {
            left: 0;
        }

        .ms-header-right {
            right: 0;
        }

        .ms-header-back {
            width: 34px;
            height: 34px;
            background-color: transparent;
            overflow: hidden;

            &:active {
                opacity: .5;
            }
        }

        .icon {
            display: block;
            width: 100%;
            height: 100%;
            background-position: center;
            background-repeat: no-repeat;
        }

        .icon-back {
            background-image: url('back_icon@2x.png');
            background-size: 66% auto;
        }

        .icon-close {
            background-image: url('close_icon@2x.png');
            background-size: 60% auto;
            margin-left: 5px;
        }

        .ms-header-content {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: 5px 10px;

            text-align: center;
            z-index: 0;
        }

        .title {
            font-size: 18px;
            color: #fff;
            line-height: 34px;
            font-weight: 500;
        }

        .bottom {
            width: 100%;
        }

    }
</style>