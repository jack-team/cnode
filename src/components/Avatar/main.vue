<template>
    <img :src="source" :style="style" class="avatar"/>
</template>

<script lang="ts">
   import Vue from 'vue';
   import {
       Prop,
       Watch,
       Component
   } from 'vue-property-decorator';

   import avatarPic from './avatar.png';

   @Component
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
               this.source = this.url;
           }
       }

       get style() {
           return {
               width:this.size+'px',
               height:this.size+'px',
               borderRadius:this.size/2+'px'
           }
       }

       @Watch(`url`)
       onUrlChange() {
          this.onLoadImage()
       }
   }
</script>

<style scoped lang="scss">
    .avatar {
        border: 1px solid #f2f2f2;
    }
</style>