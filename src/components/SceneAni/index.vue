<template>
    <div>
        <div class="header"></div>
        <transition :name="transitionName">
            <router-view class="child-view"></router-view>
        </transition>
    </div>
</template>

<script>
    const history_key = `CNODE_HISTORY`;
    import {mapState, mapActions} from 'vuex';
    import userTypes from './../../store/types/user';

    const actions = mapActions({...userTypes});

    export default {
        data() {
            return {
                transitionName: 'slide-left',
                ...actions
            }
        },
        computed: {
            ...mapState({
                userPath: state => {
                    return state.user.userPath
                }
            }),
        },
        beforeRouteUpdate(to, from, next) {
            const preName = from.name,
                nextName = to.name;

            this.saveUserPath({
                pre: preName,
                next: nextName
            });
            const {userPath} = this;

            const nextIndex = userPath.findIndex(name => name === nextName);
            const preIndex = userPath.findIndex(name => name === preName);

            const isBack = nextIndex < preIndex;

            this.transitionName = isBack ? `slide-right` : `slide-left`;

            if (isBack) this.deleteUserPath(preName);

            next();
        },
        methods: {}
    }
</script>

<style scoped>
    .child-view {
        position: absolute;
        width: 100%;
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

    .header {
        position: absolute;
        height: 44px;
        background: linear-gradient(to right, #FF7A4C, #FF5655);
        width: 100%;
        left: 0;
        top: 0;
    }
</style>