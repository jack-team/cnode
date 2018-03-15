<template>
    <div class="ms-page" v-has-header>
        <MsHeader :title="'我的'"></MsHeader>
        <ScrollView>
            <div class="user-cover" v-if="!!user">
                <div class="user-avator" :style="{backgroundImage:`url(${user.avatar_url})`}"></div>
                <p class="login-name">{{user.loginname}}</p>
            </div>
        </ScrollView>
    </div>
</template>

<script>
    import { MsHeader } from './../components';
    import userTypes from './../store/types/user';
    import { mapState , mapActions } from 'vuex';
    const actions = mapActions({...userTypes});
    export default {
        name: "user",
        components:{
            MsHeader
        },
        data(){
            return{
                ...actions
            }
        },
        mounted(){
            const { loginName } = this.$route.params;
            this.getUserInfo(loginName);
        },
        computed:{
            ...mapState({
                userState: state => state.user
            }),
            user(){
                const { loginName } = this.$route.params;
                return this.userState.userSave[loginName];
            }
        },
        methods:{

        }
    }
</script>

<style scoped lang="scss">
    .user-cover {
        height: 160px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .user-avator {
        width: 100px;
        height: 100px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 50px;
    }

    .login-name {
        font-size: 16px;
        color: #333;
        margin-top: 10px;
    }
</style>