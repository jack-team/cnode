<template>
    <div class="login-page" v-has-header>
        <ms-header :goBack="goBack" :close="true" :title="'登录'"></ms-header>
        <form class="login-form" @submit.prevent="onSubmit">
            <input type="text" class="login-input" v-model="token" placeholder="请输入Access Token">
            <ms-button class="login-btn">登录</ms-button>
        </form>
    </div>
</template>

<script>
    import { MsHeader, MsButton } from '../../components';
    import { mapActions , mapState } from 'vuex'
    import userTypes from './../../store/types/user';
    const  actions = mapActions({...userTypes});
    export default {
        name: "login",
        props: {
            $$modal: {
                type: Object,
                default: {}
            },
            success:{
                type:Function,
                default:()=>{}
            }
        },
        components: {
            MsHeader,
            MsButton
        },
        data() {
            return {
                ...actions,
                token:null
            }
        },
        computed:{
            ...mapState({
                userState: state => state.user
            })
        },
        methods: {
            goBack() {
                this.$$modal.show = false;
            },
            onSubmit(e) {
                const { token } = this;
                if (!token) return this.$PopUp.tip(`请输入Access Token...`);
                this.login(token).then( data => {
                    this.success(this.goBack.bind(this),data);
                }).catch(err=>{
                    this.$PopUp.tip(err.error_msg);
                });
            }
        }
    }
</script>
<style scoped lang="scss">
    .login-page {
        width: 100vm;
        height: 100vh;
        background-color: #fff;
        position: relative;
    }
    .login-form {
        display: block;
        padding: 20px 16px;
        height: 100%;
    }
    .login-input {
        height: 48px;
        display: block;
        width: 100%;
        border-bottom: 1px solid #ccc;
        font-size: 16px;
        color: #999;
        &:focus {
            border-color: #FF5655;
        }
    }
    .login-btn {
        display: block;
        width: 100%;
        height: 46px;
        border-radius: 6px;
        font-size: 16px;
        margin-top: 30px;
    }
</style>