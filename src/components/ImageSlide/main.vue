<template>
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true" ref="el">
        <div class="pswp__bg"></div>
        <div class="pswp__scroll-wrap">
            <div class="pswp__container">
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
            </div>
            <div class="pswp__ui pswp__ui--hidden">
                <div class="pswp__top-bar">
                    <div class="pswp__counter"/>
                    <button class="pswp__button pswp__button--close" title="Close (Esc)"/>
                    <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"/>
                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                            <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                    <div class="pswp__share-tooltip"/>
                </div>
                <div class="pswp__caption">
                    <div class="pswp__caption__center"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import PhotoSwipe from 'photoswipe';
    import 'photoswipe/dist/photoswipe.css';
    import 'photoswipe/dist/default-skin/default-skin.css';
    import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default.js';

    import {
        Prop,
        Watch,
        Emit,
        Component
    } from 'vue-property-decorator';

    interface ImageItem {
        src:string,
        w:number,
        h:number
    }
    @Component
    export default class ImageSlide extends Vue {
        @Prop({default: 0}) index!: number;
        @Prop({default: false}) show!: boolean;
        @Prop({default: []}) items!: Array<ImageItem>;

        private gallery: any = null;
        private destroyed: boolean = false;

        private mounted() {
            if (this.show) {
                this.openSlide()
            }
        }

        private created() {
            this.onListenClose = this.onListenClose.bind(this);
            this.onListenDestroy = this.onListenDestroy.bind(this);
        }

        private openSlide() {
            const {
                el
            } = this.$refs;
            const options = {
                focus: true,
                history: true,
                index: this.index,
                showHideOpacity:true,
                showAnimationDuration: 500,
                hideAnimationDuration: 500
            }
            this.gallery = (
                new PhotoSwipe(
                    el,
                    PhotoSwipeUI,
                    this.items,
                    options
                )
            )
            this.gallery.init();
            this.destroyed = false;
            this.gallery.listen(`close`, this.onListenClose);
            this.gallery.listen(`destroy`, this.onListenDestroy);
        }

        onListenDestroy() {
            this.destroyed = true;
        }

        @Emit(`close`)
        onListenClose() {
            return this.gallery;
        }

        @Watch(`show`)
        private onOpenChange(show: boolean) {
            if (show) {
                this.openSlide();
            }
            else {
                this.gallery.close();
            }
        }

        beforeDestroy() {
            if (!!this.gallery ) {
                if(!this.destroyed) {
                    this.gallery.destroy();
                }
            }
        }
    }
</script>

<style scoped>

</style>