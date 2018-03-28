<template>
    <div class="ms-image" :class="modeClassName" :style="imgStyle" @click="onClick"></div>
</template>

<script>
    export default {
        name: "t-image",
        props: {
            src: {
                type: String,
                default: ``
            },
            resizeMode: {
                type: String,
                default: `cover`,
                validator(value) {
                    const vali = [`cover`, `contain`];
                    return vali.includes(value);
                }
            },
            customStyle: {
                type: Object,
                default: () => {
                }
            }
        },
        computed: {
            modeClassName() {
                return `mode-${this.resizeMode}`;
            },
            imgStyle() {
                const {customStyle, src} = this;
                const srcStyle = {};
                if (!!src) {
                    srcStyle.backgroundImage = `url(${src})`;
                }
                return Object.assign(srcStyle, customStyle);
            }
        },
        methods: {
            onClick(e) {
                this.$emit(`click`, e);
            }
        }
    }
</script>

<style scoped lang="scss">
    .ms-image {
        display: block;
        background-position: center;
        background-repeat: no-repeat;
    }

    .mode-cover {
        background-size: cover;
    }

    .mode-contain {
        background-size: contain;
    }

</style>