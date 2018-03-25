<template>
    <div class="right-menu">
        <div class="me-info" v-if="!!userState" @click="goMy">
            <div class="me-avator" :style="{backgroundImage:`url(${userState.avatar_url})`}"></div>
            <div class="me-name">{{userState.loginname}}</div>
        </div>
        <div class="login-entry" @click="goLogin" v-else>
            <p class="text">登录</p>
            <div class="login-icon"></div>
        </div>
        <ul class="other-items">
            <li class="item" @click="onRelease">发表</li>
            <li class="item message" @click="onMessage">消息</li>
        </ul>
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
        created(){
            this.timeOut=[];
        },
        beforeDestroy(){
            this.timeOut.forEach(t=>clearTimeout(t));
        },
        methods:{
            goLogin(){
                const modal = this.$openLogin(()=> {
                    modal.show = false
                });
            },
            onRelease(){
                this.$emit(`click`);
                this.timeOut.push(
                    setTimeout(()=>{
                        this.$router.push(`/release`);
                    },350)
                )
            },
            goMy(){
                const { loginname } = this.userState;
                this.$emit(`click`);
                this.timeOut.push(
                    setTimeout(() => {
                        this.$router.push(`/user/${loginname}`);
                    },350)
                )
            },
            onMessage(){
                const isLogin = getUserLogin();
                this.timeOut.push(
                    setTimeout(()=> {
                        this.$router.push(`/message`);
                    },isLogin ? 350 :0 )
                )
                if(isLogin) {
                    this.$emit(`click`);
                }
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
        padding: 20px 0;
        position: relative;
        font-size: 18px;
    }
    .me-info {
        &:after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            width: 20px;
            height: 20px;
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
         justify-content: center;
        .login-icon {
            width: 24px;
            height: 24px;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            background-image: url("./../image/login_icon@2x.png");
        }
        .text {
            font-size: 16px;
            color: #666;
            margin-right: 10px;
        }
    }
    .other-items {
        .item {
            height: 40px;
            border-bottom: 1px solid #ececec;
            position: relative;
            line-height: 40px;
            padding-left: 40px;
            font-size: 14px;
            color: #545454;
            &:before,&:after {
                content: '';
                display: block;
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
            }
            &:before {
                width: 24px;
                height: 24px;
                left: 0;
                background-image: url("./../image/send_icon.png");
            }
            &:after {
                width: 20px;
                height: 20px;
                right: 0;
                background-image: url("./../image/arrow_right.png");
            }
        }

        .message {
           &:before {
               background-image: url("./../image/message_icon.png");
               width: 22px;
               height: 22px;
           }
        }
    }
</style>