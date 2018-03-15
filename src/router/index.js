/**
 * Created by jiangtao on 2017/5/17.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Tpl from './../components/Tpl';

const routers = [
    {
        path:'/',
        redirect:'/topic/good'
    },
    {
        path: '/topic',
        name:'topic',
        redirect:'/topic/good',
        component:Tpl,
        children:[{
            path:':category',
            name:'category',
            component:()=>import('../views/index.vue')
        }]
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
    }
];

export default new VueRouter({
    history: true,
    routes:routers
});


