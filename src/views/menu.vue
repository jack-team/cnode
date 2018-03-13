<template>
    <div class="right-menu">
        <div class="me-info" v-if="!!userState">
            <div class="me-avator" :style="{backgroundImage:`url(${userState.avatar_url})`}"></div>
            <div class="me-name">{{userState.loginname}}</div>
        </div>
        <div class="login-entry" @click="goLogin" v-else>
            <div class="login-icon"></div>
            <p class="text">登录</p>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        name: "leftMenu",
        computed:{
            ...mapState({
                userState: state => state.user.userInfo
            })
        },
        methods:{
            goLogin(){
                const modal = this.$openLogin(()=> {
                    modal.show=false
                });
            }
        }
    }
</script>
<style scoped lang="scss">
    .right-menu {
        width: 190px;
        height: 100%;
        background: #fff;
        padding: 0 10px;
    }
    .me-info,.login-entry{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ececec;
        padding: 10px 0;
        position: relative;
    }
    .me-info {
        &:after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            width: 24px;
            height: 24px;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            background-image: url("./../image/arrow_right.png");
        }
        .me-avator {
           width:40px;
           height:40px;
           border-radius: 20px;
           background-size: cover;
           background-repeat: no-repeat;
           background-position: center;
        }
        .me-name {
           font-size: 16px;
           color: #555;
           margin-left: 10px;
        }
    }
    .login-entry {
        .login-icon {
            width: 30px;
            height: 30px;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            background-image: url("./../image/login_icon@2x.png");
        }
        .text {
            font-size: 16px;
            color: #666;
            flex: 1;
            padding-left: 20px;
        }
    }
</style>