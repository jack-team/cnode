/**
 * Created by jiangtao on 2017/5/19.
 */
import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

import common from './modules/common';

import user from './modules/user';

import detail from './modules/detail';

import index from './modules/index';

const store = new Vuex.Store({
    modules : {
        common,
        user,
        detail,
        index
    }
})

export default store;

