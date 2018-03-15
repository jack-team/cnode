/**
 * Created by jiangtao on 2017/5/17.
 */

import Vue from 'vue';

import './directive';

import ajax from './common/ajax';

import { App , ScrollView } from './components';

Vue.component(`ScrollView`,ScrollView);

import Login from './components/Login/index';

import router from './router';

import store from './store';

import PopUp from './components/PopUp'

const $PopUp = new PopUp();

const $openLogin = cb => (
    $PopUp.show(Login,{
        position:`bottom`,
        opacity:0,
        maskDuration:300,
        contentDuration:300,
        disableTapClose:true
    },{success:cb})
);

//通用登录唤起
Vue.prototype.$openLogin = $openLogin;

//通用多功能弹出层
Vue.prototype.$PopUp= $PopUp;

// 开启debug模式
Vue.config.debug = true;

//网络
Vue.prototype.$http = window.ajax = ajax;

//全局通用loading
window.loading=()=>$PopUp.loading();
window.loadingClose=()=>$PopUp.loadingClose();

const { $nextTick } = Vue.prototype;

router.beforeEach(( { name } , from , next ) =>$nextTick(()=> {
    const { user } = store.state;
    const { routes } = router.options;
    const { shouldLogin } = routes.find(route=>route.name===name)||{};
    //检查当当前页面需要登录，但是用户未登录，那么弹起登录页面
    if( !!shouldLogin && !user.isLogin) {
        return $openLogin((cb)=>{
            cb();
            next();
        });
    }
    next();
}));

new Vue({
    render: ( h )=> h ( App ),
    router,
    store
}).$mount('#root');








