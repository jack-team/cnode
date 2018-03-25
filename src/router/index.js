/**
 * Created by jiangtao on 2017/5/17.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

import LazyLoad from '../components/LazyLoad';

const setRouter = routers => {
    const redirectTo = `/topic/good`;
    routers.forEach(route => {
        const { component } = route;
        if (component) {
            route.component = LazyLoad(component);
        }
    });
    return [{
        path: '/',
        name:'rt',
        redirect: redirectTo,
    }, ...routers, {
        path: '*',
        name:'404',
        redirect: redirectTo
    }]
};

const routers = setRouter([
    {
        path: '/topic/:category',
        name: 'topic',
        component: () => import('../views/index.vue')
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: () => import('../views/detail.vue')
    },
    {
        path: '/release',
        name: 'release',
        component: () => import('../views/release.vue')
    },
    {
        path: '/user/:loginName',
        name: 'user',
        component: () => import('../views/user.vue'),
        meta: {
            shouldLogin: true
        }
    },
    {
        path: '/message',
        name: 'message',
        component: () => import('../views/message.vue'),
        meta: {
            shouldLogin: true
        }
    }
]);

Vue.use(VueRouter);

export default new VueRouter({
    history: true,
    routes: routers
});


