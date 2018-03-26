<template>
    <div class="container" :class="aniDirection">
        <transition :name="transitionName">
            <router-view class="ani-scence"></router-view>
        </transition>
    </div>
</template>

<script type="es6">
    import userTypes from './../store/types/user';
    import {mapActions, mapState} from 'vuex'

    const actions = mapActions({...userTypes});

    export default {
        data() {
            return {
                ...actions,
                transitionName: `page`,
                direction: `forward`
            }
        },
        computed: {
            ...mapState({
                userPath: state => state.user.userPath
            }),
            aniDirection(){
                return `ani-${this.direction}`
            }
        },
        beforeRouteUpdate(to, from, nextRoute ){
            const preName = from.name,
                 nextName = to.name;
            if (!preName) {
                return false;
            }
            this.saveUserPath({
                pre: preName,
                next: nextName
            });
            const {userPath} = this;
            const next = userPath.findIndex(n => n === nextName);
            const pre = userPath.findIndex(n => n === preName);
            const isBack = next < pre;
            this.direction = isBack ? `back` : `forward`;
            if (isBack) {
                this.deleteUserPath(preName)
            }
            this.$nextTick(()=> nextRoute());
        }
    }
</script>


<style lang="scss" scoped>
    .ani-scence {
        position: absolute;
        transition: all .5s cubic-bezier(.36, .66, .04, 1);
        top: 0;
        left: 0;
    }

    .container {
        width: 100%;
        height: 100%;
    }
</style>

<style lang="scss">
    @mixin view-right() {
        transform: translate3d(100%, 0, 0);
    }

    @mixin view-left() {
        transform: translate3d(-50%, 0, 0);
    }

    @mixin view-center() {
        transform: translate3d(0,0,0);
    }

    .ani-forward {
        .page-enter {
            @include view-right();
            opacity: 1;
            z-index: 2;
        }
        .page-enter-active {
            box-shadow: 0 0 10px rgba(0,0,0,.15);
        }
        .page-enter-to {
            @include view-center();
            opacity: 1;
            z-index: 2;
        }
        .page-leave {
            @include view-center();
            opacity: 0.8;
            z-index: 1;
        }
        .page-leave-to {
            @include view-left();
            opacity: 0.8;
            z-index: 1;
        }
    }

    .ani-back {
        .page-enter {
            @include view-left();
            opacity: 0.8;
            z-index: 1;
        }
        .page-enter-to {
            @include view-center();
            opacity: 1;
            z-index: 1;
        }
        .page-leave {
            @include view-center();
            opacity: 1;
            z-index: 2;
        }
        .page-leave-active {
            box-shadow: 0 0 10px rgba(0,0,0,.15);
        }
        .page-leave-to {
            @include view-right();
            opacity: 1;
            z-index: 2;
        }
    }
</style>