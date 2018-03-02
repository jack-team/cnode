/**
 * Created by jiangtao on 2017/5/17.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routers = [
    {
        path: '/',
        component:( resolve ) => {
            require( ['../views/index.vue'] , resolve )
        }
    },
];

export default new VueRouter({
    history: true,
    routes:routers
});


