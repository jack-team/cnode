/**
 * Created by jiangtao on 2017/5/19.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate/dist/vuex-persistedstate';
Vue.use(Vuex);

import home from './modules/home';
import detail from './modules/detail';
import user from './modules/user';

const store = new Vuex.Store({
    plugins: [createPersistedState({
        storage: sessionStorage
    })],
    modules : {
        home,
        detail,
        user
    }
});

export default store;

