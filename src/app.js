/**
 * Created by jiangtao on 2017/5/17.
 */

import Vue from 'vue';

import './directive';

import ajax from './common/ajax';

import { App } from './components';

import Login from './components/Login/index';

import router from './router';

import store from './store';

import PopUp from './components/PopUp'

const $PopUp = new PopUp();
Vue.prototype.$PopUp= $PopUp;

//通用登录唤起
Vue.prototype.$openLogin=cb=> (
    $PopUp.show(Login,{
        position:`bottom`,
        opacity:0,
        maskDuration:200,
        contentDuration:200,
        disableTapClose:true
    },{success:cb})
);

// 开启debug模式
Vue.config.debug = true;

//网络
Vue.prototype.ajax = window.ajax = ajax;

router.beforeEach(( route , from , next ) => {
    next();
});

new Vue({
    render: ( h )=> h ( App ),
    router,
    store
}).$mount('#root');








