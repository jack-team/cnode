/**
 * Created by jiangtao on 2017/5/17.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import LazyLoad from './../LazyLoad';

const routers = [
    {
        path:'/',
        redirect:'/topic/good'
    },
    {
        path: '/topic/:category',
        name:'topic',
        component:()=>import('../views/index.vue')
    },
    {
        path:'/detail/:id',
        name:'detail',
        component:()=>import('../views/detail.vue')
    },
    {
        path:'/release',
        name:'release',
        component:()=>import('../views/release.vue'),
        shouldLogin:true
    },
    {
        path:'/user/:loginName',
        name:'user',
        component:()=>import('../views/user.vue'),
        shouldLogin:true
    },
    {
        path:'/message',
        name:'message',
        component:()=>import('../views/message.vue'),
        meta:{
            shouldLogin:true
        }
    },
    {
        path:'*',
        redirect:'/topic/good'
    }
];

routers.forEach( route => {
    const { component } = route;
    if(component) {
        route.component=LazyLoad(component);
    }
});

export default new VueRouter({
    history: true,
    routes:routers
});


