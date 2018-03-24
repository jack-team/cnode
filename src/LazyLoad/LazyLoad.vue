<template>
    <div class="load-ani">
        <div class="span">
            <div class="square"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "lazy-load",
        props:{
            Component:{
                type:Function,
                default:()=>{}
            }
        },
        data(){
            return {

            }
        },
        mounted(){

        }
    }
</script>

<style scoped lang="scss">
    .load-ani {
        width: 100vw;
        height: 100vh;
        background-color: #FF7A4C;
        display: flex;
        justify-content: center;
        align-items: center;

        .square {
            width: 20px;
            height: 20px;
            border: 1px solid #fff;
            margin: 36px auto;
            position: relative;
            -webkit-animation: fill_color 5s linear infinite;
            animation: fill_color 5s linear infinite
        }

        .square:after {
            width: 4px;
            height: 4px;
            position: absolute;
            content: "";
            background-color: #fff;
            top: -8px;
            left: 0;
            -webkit-animation: square_check 1s ease-in-out infinite;
            animation: square_check 1s ease-in-out infinite
        }

        @-webkit-keyframes square_check {
            25% {
                left: 22px;
                top: -8px
            }
            50% {
                left: 22px;
                top: 22px
            }
            75% {
                left: -9px;
                top: 22px
            }
            100% {
                left: -9px;
                top: -7px
            }
        }

        @keyframes square_check {
            25% {
                left: 22px;
                top: -8px
            }
            50% {
                left: 22px;
                top: 22px
            }
            75% {
                left: -9px;
                top: 22px
            }
            100% {
                left: -9px;
                top: -7px
            }
        }

        @-webkit-keyframes fill_color {
            0% {
                -webkit-box-shadow: inset 0 0 0 0 rgba(255, 255, 255, .1);
                box-shadow: inset 0 0 0 0 rgba(255, 255, 255, .1)
            }
            100% {
                -webkit-box-shadow: inset 0 -20px 0 0 #fff;
                box-shadow: inset 0 -20px 0 0 #fff
            }
        }

        @keyframes fill_color {
            0% {
                -webkit-box-shadow: inset 0 0 0 0 rgba(255, 255, 255, .1);
                box-shadow: inset 0 0 0 0 rgba(255, 255, 255, .1)
            }
            100% {
                -webkit-box-shadow: inset 0 -20px 0 0 #fff;
                box-shadow: inset 0 -20px 0 0 #fff
            }
        }
    }

</style>