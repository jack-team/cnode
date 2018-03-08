<template>
    <div class="global-modal" :class="modalClass">
        <div class="modal-container" :class="showClass">
            <div class="modal-mask" @click="()=>!this.flag && this.onClose()"></div>
            <div class="modal-content">
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
                default: true
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
            }
        },
        data() {
            return {
                modal: this.show,
                isShow:this.show
            }
        },
        destroyed(){
          this.timer && clearTimeout(this.timer);
        },
        computed: {
            modalClass() {
                const {position, modal} = this;
                return {
                    [position]: true,
                    show: modal
                }
            },
            showClass(){
                return {
                    [`modal-show`]:this.isShow
                }
            }
        },
        watch: {
            show(show) {
                if(this.flag) return;
                this.flag = true;
                if (show) {
                    this.modal = show;
                    requestAnimationFrame(() => {
                        this.flag=false;
                        this.isShow=true;
                        this.aniCallback();
                    });
                } else {
                    this.isShow=false;
                    this.timer=setTimeout(() => {
                        this.flag=false;
                        this.modal = false;
                        this.aniCallback();
                    }, 350);
                }
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
        transition: all .35s cubic-bezier(0.23, 1, 0.32, 1);
    }

    .modal-content {
        transition: all .35s cubic-bezier(0.23, 1, 0.32, 1);
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
            .content-show {
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
            transition-duration: .3s;
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