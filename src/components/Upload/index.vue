<template>
    <div class="upload-file" @click="_uploadBefore">
        <input type="file" ref="el" @change="onChange"/>
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
            uploading:{
                type: Function,
                default: ()=>{}
            },
            uploadSuccess: {
                type: Function,
                default: () => {}
            },
            uploadError: {
                type: Function,
                default: () => {}
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
            onChange(e) {
                if (this.loading) return false;
                this.loading = true;
                this.uploading();
                const {files} = e.target;
                const file = files[0];
                const formData = new FormData();
                formData.append(`file`, file);
                this.$http.upload(formData).then(url => {
                    this.uploadSuccess(url);
                }).catch(e => {
                    this.uploadError(e);
                }).finally(() => {
                    this.loading = false;
                    e.target.value=``;
                    loadingClose()
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