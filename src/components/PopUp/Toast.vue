<template>
    <div class="toast">
        {{message}}
    </div>
</template>

<script>
    export default {
        name: "toast",
        props:{
            message:{
                type:String,
                default:``
            }
        }
    }
</script>

<style scoped>
    .toast {
        background-color: #333;
        max-width: 300px;
        padding: 12px 16px;
        color: #fff;
        border-radius: 6px;
    }
</style>