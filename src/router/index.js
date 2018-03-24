/**
 * Created by jiangtao on 2017/5/17.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import SceneAni from './../components/SceneAni/index';

import LazyLoad from '../components/LazyLoad';

const routers = [
    {
        path: '/',
        component: SceneAni,
        redirect:'/topic/good',
        children: [
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
                component: () => import('../views/release.vue'),
                shouldLogin: true
            },
            {
                path: '/user/:loginName',
                name: 'user',
                component: () => import('../views/user.vue'),
                shouldLogin: true
            },
            {
                path: '/message',
                name: 'message',
                component: () => import('../views/message.vue'),
                meta: {
                    shouldLogin: true
                }
            },
        ]
    },

    {
        path: '*',
        redirect: '/topic/good'
    }
];

routers[0].children.forEach(route => {
    const {component} = route;
    if (component) {
        route.component = LazyLoad(component);
    }
});

export default new VueRouter({
    history: true,
    routes: routers
});


