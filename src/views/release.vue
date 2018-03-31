<template>
    <div class="ms-page bg-white" v-has-header>
        <THeader :title="'发表主题'"></THeader>
        <form class="sub-form" @submit.prevent="onSubmit">
            <input type="text" class="title" placeholder="请输入主题" v-model="title"/>
            <div class="content">
                <textarea placeholder="请输入内容" v-textarea-auto v-model="content"></textarea>
            </div>
            <div class="upload-group">
                <p class="name">添加图片</p>
                <div class="upload-image-wrapper">
                    <Timage v-for="img in imgs" :src="img" class="img-list"></Timage>
                    <Upload class="img-upload" :uploadSuccess="uploadSuccess" :uploading="uploading"></Upload>
                </div>
            </div>
            <div class="select-box">
                <Tselect :options="options" v-model="type" :title="'请选择发布类型'"></Tselect>
            </div>
            <TButton class="button">发布</TButton>
        </form>
    </div>
</template>

<script>
    import {Tselect, Timage} from './../components';
    import Upload from './../components/Upload';
    import {mapActions, mapState} from 'vuex'

    export default {
        name: "release",
        components: {
            Tselect,
            Upload,
            Timage
        },
        data() {
            const options = [
                {name: `测试`, value: `dev`},
                {name: `问答`, value: `ask`},
                {name: `分享`, value: `share`},
                {name: `招聘`, value: `job`}
            ];
            return {
                title: ``,
                content: ``,
                type: `dev`,
                options: options,
                imgs: []
            }
        },
        computed: {
            ...mapState({
                userState: state => state.user
            })
        },
        methods: {
            transform(str) {
                str= str.replace(/\n/g, `  `);
                const imgStr=this.imgs.map(img=>{
                    return `![${img}](${img})`
                }).join(``);
                return str+imgStr;
            },
            uploadSuccess(img) {
                this.imgs = this.imgs.concat(img);
            },
            uploading() {
                loading();
            },
            onSubmit() {
                let {title, content} = this;

                let errMsg = null;

                title = trim(title);

                content = trim(content);

                if (!title) {
                    errMsg = `请输入标题！`;
                }

                if (title.length < 10) {
                    errMsg = `标题不能小于小于10个字`;
                }

                if (!content) {
                    errMsg = `请输入内容`;
                }

                if (content.length < 15) {
                    errMsg = `内容不能小于15个字`;
                }

                if (!!errMsg) {
                    return this.$PopUp.tip(errMsg);
                }

                const isLogin = getUserLogin();

                if (!isLogin) {
                    return this.$openLogin(cb => {
                        cb();
                        this.release();
                    });
                }
                this.release();
            },
            release() {
                loading(`发布中...`);
                let {title, content, type, userState} = this;
                const {access_token} = userState;
                this.$http.post("/topics", {
                    title: title,
                    tab: type,
                    content: this.transform(content),
                    accesstoken: access_token
                }).then(({topic_id}) => {
                    this.$PopUp.toast(`发布成功！`, () => {
                        this.$router.push(`/detail/${topic_id}`)
                    });
                }).catch(({error_msg}) => {
                    this.$PopUp.alert(error_msg || `发布失败，请重新发布！`);
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
            min-height: 80px;
            outline: none;
            border: none;
            resize: none;
            font-size: 14px;
            padding: 0;
            color: #555;
        }
    }

    .select-box {
        margin-top: 10px;
    }

    .button {
        height: 42px;
        width: 100%;
        border-radius: 6px;
        margin-top: 30px;
        font-size: 16px;
    }

    .upload-group {
        margin-top: 16px;

        .name {
            font-size: 16px;
            color: #666;
        }

    }

    .upload-image-wrapper {
        display: flex;
        flex-wrap: wrap;
        margin-top: 6px;

        .img-list {
            width: 60px;
            height: 60px;
            margin-right: 10px;
            margin-bottom: 10px;
            border-radius: 4px;
        }

        .img-upload {
            margin-bottom: 10px;
            border-radius: 4px;
        }
    }
</style>