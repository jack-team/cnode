import Vue from 'vue';
import App from './components/App.vue';

import './common';

import store from './state';
import router from './router';

new Vue({
    store: store,
    router: router,
    render: h => h(App),
}).$mount(`#app`);