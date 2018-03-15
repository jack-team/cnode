<template>
    <div class="ms-page bg-white" v-has-header>
        <MsHeader :title="'发表主题'"></MsHeader>
        <form class="sub-form" @submit.prevent="onSubmit">
            <input type="text" class="title" placeholder="请输入主题" v-model="title"/>
            <div class="content">
                <textarea placeholder="请输入内容" v-textarea-auto v-model="content"></textarea>
            </div>
            <div class="select-box">
                <MsSelect :options="options" v-model="type" :title="'请选择发布类型'"></MsSelect>
            </div>
            <MsButton class="button">发布</MsButton>
        </form>
    </div>
</template>

<script>
    import { MsHeader , MsButton , MsSelect } from './../components';
    import { mapActions , mapState } from 'vuex'
    export default {
        name: "release",
        components:{
            MsHeader,
            MsButton,
            MsSelect
        },
        data(){
            const options = [
                {name:`测试`,value:`dev`},
                {name:`问答`,value:`ask`},
                {name:`分享`,value:`share`},
                {name:`招聘`,value:`job`}
            ];
            return {
                title:``,
                content:``,
                type:`dev`,
                options:options
            }
        },
        computed:{
            ...mapState({
                userState: state => state.user
            })
        },
        methods:{
            onSubmit(){
                let { title , content , type , userState } = this;

                let errMsg = null;

                title=title.trim();

                content=content.trim();

                if(!title) {
                    errMsg=`请输入标题！`;
                }

                if(title.length < 10) {
                    errMsg=`标题不能小于小于10个字`;
                }

                if(!content) {
                    errMsg = `请输入内容`;
                }

                if(content.length < 15){
                    errMsg=`内容不能小于15个字`;
                }

                if(!!errMsg){
                    return this.$PopUp.tip(errMsg);
                }

                const { access_token } = userState;

                loading();

                this.$http.post("/topics",{
                    title:title,
                    tab:type,
                    content:content,
                    accesstoken:access_token
                }).then(({ topic_id }) => {
                    this.$PopUp.toast(`发布成功！`,()=>{
                        this.$router.push(`/detail/${topic_id}`)
                    });
                }).catch(()=>{
                    this.$PopUp.alert(`发布失败，请重新发布！`);
                }).finally(loadingClose);
            }
        }
    }
</script>

<style scoped lang="scss">
    .sub-form {
        display: block;
        padding: 16px 10px;
    }

    .bg-white {
        background-color: #fff;
    }

    .title {
        height: 40px;
        width: 100%;
        outline: none;
        border: 1px solid #ccc;
        background-color: #fff;
        border-radius: 2px;
        padding: 0 10px;
        font-size: 14px;
        color: #555;
        &:focus {
            border-color: #FF7A4C;
        }
    }

    .content {
        display: block;
        background-color: #fff;
        margin-top: 16px;
        width: 100%;
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 2px;
        textarea {
            display: block;
            width: 100%;
            min-height: 200px;
            outline: none;
            border: none;
            resize:none;
            font-size: 14px;
            padding: 0;
            color: #555;
        }
    }

    .select-box {
        margin-top: 16px;
    }

    .button {
        height: 42px;
        width: 100%;
        border-radius: 6px;
        margin-top: 30px;
        font-size: 16px;
    }
</style>