<template>
    <div class="tip-loading">
        <Loading class="loading-state"></Loading>
        <p class="text">{{message}}</p>
    </div>
</template>

<script>
    import Loading from './../Loading';
    export default {
        name: "tip-loading",
        components:{
            Loading
        },
        props:{
            message:{
                type:String,
                default:`正在加载...`
            }
        }
    }
</script>

<style scoped>

    .tip-loading {
        width: 92px;
        height: 84px;
        background-color: rgba(0,0,0,.8);
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .loading-state {
        width: 30px !important;
        height: 30px !important;
    }

    .text {
        color: #999;
        margin-top: 12px;
        font-size: 12px;
    }

</style>