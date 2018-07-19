<template>
    <div id="app">
        <router-view></router-view>
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
            return {...actions}
        },
        computed: {
            ...mapState({
                userState: state => state.user
            })
        },
        mounted() {
            const {
                access_token,
                isLogin
            } = this.userState;
            if (isLogin) {
                this.login(access_token)
            }
        },
    }
</script>

<style lang="scss" scoped>
    #app {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        width: 100%;
        margin: auto;
        max-width: 640px;
        height: 100%;
        background-color: #f2f2f2;
        overflow: hidden;
    }
</style>