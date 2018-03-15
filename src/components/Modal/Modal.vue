<template>
    <div class="global-modal" :class="modalClass" :style="{height:modalHeight}">
        <div class="modal-container" :class="showClass">
            <div class="modal-mask" :style="maskStyle" @click="()=>!this.flag && !disableTapClose && this.onClose()"></div>
            <div class="modal-content" :style="contentStyle">
                <slot>
                    <div modal-content></div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            onClose: {
                type: Function,
                default: () => {}
            },
            aniCallback:{
                type: Function,
                default: () => {}
            },
            position: {
                type: String,
                default: `center`,
                validator: value => ([
                    `left`,
                    `right`,
                    `top`,
                    `bottom`,
                    `center`
                ].includes(value))
            },
            maskDuration:{
                type:Number,
                default:350
            },
            contentDuration:{
                type:Number,
                default:350
            },
            cubicBezier:{
                type:String,
                default:`cubic-bezier(0.77, 0, 0.175, 1)`
            },
            opacity:{
                type:Number,
                default:1
            },
            height:{
                type:Number,
                default:0
            },
            disableTapClose:{
                type: Boolean,
                default: false
            },
            customStyle:{
                type: Object,
                default: ()=>{}
            }
        },
        created() {
            this.flag = false;
            this.openTimer = null;
            this.closeTimer = null;
        },
        data() {
            return {
                modal: this.show,
                isShow:this.show
            }
        },
        destroyed(){
            this.openTimer && clearTimeout(this.openTimer);
            this.closeTimer && clearTimeout(this.closeTimer);
        },
        computed: {
            modalClass() {
                const {position, modal} = this;
                return {
                    [position]: true,
                    show: modal
                }
            },
            modalHeight(){
               const { height } = this;
               return !!height ? `${height}px`:`auto`
            },
            showClass(){
                return {
                    [`modal-show`]:this.isShow
                }
            },
            maskStyle(){
                const { maskDuration , opacity , isShow } = this;
                return {
                    ...this.getCommonStyle(`${maskDuration/1000}s`),
                    opacity:isShow?opacity:0
                };
            },
            contentStyle(){
                const { contentDuration , customStyle } = this;
                const commonStyle=this.getCommonStyle(`${contentDuration/1000}s`)
                return {
                    ...commonStyle,
                    ...customStyle
                };
            },
        },
        methods:{
            getCommonStyle ( duration ){
                return {
                    webkitTransitionDuration:duration,
                    transitionDuration:duration,
                    transitionTimingFunction:this.cubicBezier,
                    webkitTransitionTimingFunction:this.cubicBezier
                }
            },
            modalIn(){
                this.modal = true;
                this.$nextTick(()=> {
                    this.openTimer = setTimeout(()=>{
                        this.flag = false;
                        this.isShow = true;
                        this.aniCallback();
                    },16)
                });
            },
            modalOut(){
                this.isShow = false;
                this.$nextTick(()=> {
                    this.closeTimer = setTimeout(() => {
                        this.flag = false;
                        this.modal = false;
                        this.aniCallback();
                    }, Math.max(...[`mask`,`content`].map(key=>
                        this[`${key}Duration`]
                    )));
                });
            }
        },
        watch: {
            show(show) {
                if( this.flag ) return;
                this.flag = true;
                if(show)this.modalIn();
                else this.modalOut();
            }
        }
    }
</script>

<style scoped lang="scss">

    .global-modal {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 99;
        display: none;
    }

    .modal-container {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }


    .modal-mask {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 1;
        opacity: 0;
        background-color: rgba(0, 0, 0, .5);
    }

    .modal-mask,.modal-content {
        transition-property: all;
    }

    .global-modal.show {
        display: block;
    }

    .modal-container.modal-show {
        .modal-mask {
            opacity: 1;
        }
    }

    .global-modal.top {
        .modal-content {
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            transform: translateY(-100%);
            z-index: 2;
        }
        .modal-show {
            .modal-content {
                transform: translateY(0);
            }
        }
    }

    .global-modal.bottom {
        .modal-content {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            transform: translateY(100%);
            z-index: 2;
        }
        .modal-show {
            .modal-content {
                transform: translateY(0);
            }
        }
    }

    .global-modal.left {
        .modal-content {
            position: absolute;
            z-index: 2;
            left: 0;
            top: 0;
            height: 100%;
            transform: translateX(-100%);
        }
        .modal-show {
            .modal-content {
                transform: translateX(0);
            }
        }
    }

    .global-modal.center {
        .modal-content {
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 2;
            transform:  scale(.2);
            opacity: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .modal-show {
            .modal-content {
                transform:  scale(1);
                opacity: 1;
            }
        }
    }
</style>