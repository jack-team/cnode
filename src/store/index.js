/**
 * Created by jiangtao on 2017/5/19.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import home from './modules/home';

const store = new Vuex.Store({
    modules : {
        home
    }
})

export default store;

