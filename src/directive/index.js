/**
 * Created by jiangtao on 2017/6/11.
 */


import Vue from 'vue';


//

Vue.directive(`has-header`,{
    inserted (el) {
       el.classList.add(`ms-has-header`);
    }
});




