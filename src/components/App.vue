<template>
    <div id="app" @touchmove.prevent>
        <div class="header-root"></div>
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
                transitionName: ``,
            }
        },
        computed: {
            ...mapState({
                userState: state => state.user,
                userPath: state => {
                    return state.user.userPath
                }
            })
        },
        mounted() {
            const {access_token, isLogin} = this.userState;
            if (isLogin) this.login(access_token);
        },
        watch: {
            $route(to, from) {
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
                this.transitionName = isBack ? `slide-right` : `slide-left`;
                if (isBack) this.deleteUserPath(preName);
            }
        }
    }
</script>

<style lang="scss">
    body {
        background-color: #555;
    }

    #app {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
        width: 100%;
        margin: auto;
        max-width: 640px;
        height: 100%;
        background-color: #f2f2f2;
        overflow: auto;
    }

    .ani-scence{
        position: absolute;
        transition: all .5s cubic-bezier(0.23, 1, 0.32, 1);
        opacity: 1;
        top: 0;
        left: 0;
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        transform: translate(33%, 0);
    }

    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        transform: translate(-33%, 0);
    }

    .header-root {
        position: absolute;
        height: 44px;
        background: linear-gradient(to right, #FF7A4C, #FF5655);
        width: 100%;
        left: 0;
        top: 0;
    }
</style>