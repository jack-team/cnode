<template>
    <div class="container" :class="aniDirection">
        <transition :name="transitionName">
            <router-view class="action-scence"></router-view>
        </transition>
    </div>
</template>

<script type="es6">
    import userTypes from './../store/types/user';
    import {
        mapActions,
        mapState
    } from 'vuex';

    const actions = mapActions({
        ...userTypes
    });

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
            aniDirection() {
                return `action-${this.direction}`
            }
        },
        methods:{
            getPathIndex(pathName){
                return this.userPath.findIndex(path=>pathName === path);
            }
        },
        beforeRouteUpdate(to, from, nextRoute) {
            const preName = from.name,
                  nextName = to.name;
            if (!preName) return false;
            this.saveUserPath({
                pre: preName,
                next: nextName
            });
            const nextIndex = this.getPathIndex(nextName);
            const preIndex = this.getPathIndex(preName);
            const isBack = nextIndex < preIndex;
            this.direction = isBack ? `back` : `forward`;
            if (isBack) this.deleteUserPath(preName);
            if (nextName === `topic`) this.deleteUserPath();
            this.$nextTick(() => nextRoute());
        }
    }
</script>


<style lang="scss" scoped>
    .action-scence {
        position: absolute;
        transition: all .5s cubic-bezier(.36, .66, .04, 1);
        top: 0;
        left: 0;
    }

    .container {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>

<style lang="scss">
    @mixin view-right() {
        transform: translate3d(100%, 0, 0);
    }

    @mixin view-left() {
        transform: translate3d(-100%, 0, 0);
    }

    @mixin view-center() {
        transform: translate3d(0, 0, 0);
    }

    .action-forward {
        .page-enter {
            @include view-right();
            opacity: 1;
            z-index: 2;
        }
        .page-enter-active {
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        }
        .page-enter-to {
            @include view-center();
            opacity: 1;
            z-index: 2;
        }
        .page-leave {
            @include view-center();
            opacity: 0.5;
            z-index: 1;
        }
        .page-leave-to {
            @include view-left();
            opacity: 0.5;
            z-index: 1;
        }
    }

    .action-back {
        .page-enter {
            @include view-left();
            opacity: 0.5;
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
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        }
        .page-leave-to {
            @include view-right();
            opacity: 1;
            z-index: 2;
        }
    }
</style>