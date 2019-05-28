<template>
    <div :style="style" class="avatar-style"/>
</template>

<script lang="ts">
   import Vue from 'vue';

   import {
       Prop,
       Watch,
       Component
   } from 'vue-property-decorator';

   import avatarPic from './avatar.png';

   @Component({
       name:`Avatar`
   })
   export default class Avatar extends Vue {
       @Prop({default:``}) url!:string;
       @Prop({default:60}) size!:number;
       source:string = avatarPic;

       mounted() {
           this.onLoadImage()
       }

       onLoadImage() {
           const image = new Image();
           image.src = this.url;
           image.onload = () => {
               this.source = this.url
           }
       }

       get style() {
           return {
               width:this.size+'px',
               height:this.size+'px',
               borderRadius:this.size/2+'px',
               backgroundImage:`url(${this.source})`
           }
       }

       @Watch(`url`)
       onUrlChange() {
          this.onLoadImage()
       }
   }
</script>

<style scoped lang="scss">
    .avatar-style {
        border: 1px solid #f2f2f2;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
</style>