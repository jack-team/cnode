<template>
    <div @click="openModal" ref="el">
        <slot></slot>
    </div>
</template>

<script>
    import Jroll from 'jroll';
    import JRollViewer from 'jroll-viewer';

    export default {
        name: "review",
        created() {
            this.imgs = [];
            this.viewer = null;
        },
        beforeDestroy() {
            if (!!this.viewer) {
                const { jroll, viewer} = this.viewer;
                jroll.destroy();
                document.body.removeChild(viewer);
            }
        },
        methods: {
            openModal({currentTarget, target}) {
                const { nodeName } = target;

                if (nodeName.toLocaleUpperCase() !== `IMG`) {
                    return false;
                }

                if (!this.imgs.length) {
                    this.setAttr(currentTarget)
                }

                if (!this.viewer) {
                    this.initReView();
                    const openIndex = this.imgs.findIndex(img=>img.src===target.src);
                    this.viewer.show(openIndex);
                }
            },
            initReView() {
                this.viewer = new JRollViewer(this.$refs.el);
            },
            setAttr(target) {
                this.imgs = [...target.querySelectorAll(`img`)];
                for (let i = 0; i < this.imgs.length; i++) {
                    this.imgs[i].setAttribute(`jroll-viewer-image`, true);
                }
            }
        }
    }
</script>

<style scoped>

</style>