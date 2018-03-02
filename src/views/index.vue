<template>
    <div class="ms-page" v-has-header>
        <ms-header :title="title">
            <button class="menu-icon" slot="right"></button>
        </ms-header>
        <scroll-view>

        </scroll-view>
    </div>
</template>

<script>

    import {
        TabBar,
        MsHeader,
        ScrollView,
    } from './../components';

    export default {
        components: {
            MsHeader,
            ScrollView,
            TabBar
        },

        data() {
            return {
                title:'首页'
            }
        },

        created() {

        },

        mounted() {
            this.ajax.post('/accesstoken',{
                accesstoken:'1111'
            })

        },

        beforeMount() {

        },

        beforeDestroy() {

        },

        methods: {},

    }
</script>

<style lang="scss" scoped>
    .menu-icon {
        width: 52px;
        height: 34px;
        background-color: transparent;
        background-image: url("./../image/menu_icon@2x.png");
        background-size: auto 76%;
        background-repeat: no-repeat;
        background-position:center;
        &:active {
            opacity: .5;
        }
    }

</style>