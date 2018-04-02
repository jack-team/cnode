<template>
    <div class="upload-file" @click="_uploadBefore">
        <input type="file" accept="image/*" ref="el" @change="onChange"/>
    </div>
</template>

<script>
    const event = () => (
        new MouseEvent(`click`, {
            bubbles: false,
            cancelable: false,
            view: window
        })
    );
    export default {
        name: "index",
        props: {
            uploadBefore: {
                type: Function,
                default: next => next()
            },
            uploading: {
                type: Function,
                default: () => {}
            },
            uploadSuccess: {
                type: Function,
                default: () => {}
            },
            uploadError: {
                type: Function,
                default: () => {}
            },
            uploadEnded: {
                type: Function,
                default: () => {}
            },
            maxSize:{
                type:Number,
                default:5
            }
        },
        created() {
            this.loading = false;
        },
        methods: {
            btnClick() {
                const {el} = this.$refs;
                el.dispatchEvent(event());
            },
            _uploadBefore() {
                this.uploadBefore(this.btnClick.bind(this))
            },

            valid(files) {
                let msg=null;
                [...files].some(({size , name })=>{
                    const sizeM=size/1024/1024;
                    if(sizeM>this.maxSize){
                        msg=`图片${name}大于${this.maxSize}M，不能上传！`
                    }
                });
                return msg;
            },

            onChange({target}) {
                const {files} = target;
                const formData = new FormData();

                const valiMsg = this.valid(files);

                if (!!valiMsg) return this.$PopUp.tip(valiMsg);

                if (this.loading) return false;
                this.loading = true;
                this.uploading();

                [...files].forEach(file => {
                    formData.append(`file`, file);
                });

                this.$http.upload(formData).then(url => {
                    this.uploadSuccess(url);
                }).catch(e => {
                    this.uploadError(e);
                }).finally(() => {
                    target.value = ``;
                    this.loading = false;
                    this.uploadEnded();
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .upload-file {
        width: 60px;
        height: 60px;
        border: 1px solid #ececec;
        position: relative;
        input[type="file"] {
            display: none;
        }
        &:before, &:after {
            content: '';
            display: block;
            width: 60%;
            height: 2px;
            background-color: #ccc;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
            border-radius: 2px;
        }
        &:after {
            height: 60%;
            width: 2px;
            transform: translate3d(-50%, -50%, 0);
        }
    }
</style>