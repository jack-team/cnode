/**
 * Created by jiangtao on 2017/5/17.
 */

import Vue from 'vue';

import './directive';

import ajax from './common/ajax';

import { App } from './components';

import router from './router';

import store from './store';

// 开启debug模式
Vue.config.debug = true;

//网络
Vue.prototype.ajax = ajax;

new Vue({
    render: ( h )=> h ( App ),
    router,
    store
}).$mount('#root');






