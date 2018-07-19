import LazyLoad from '../components/LazyLoad';
export default [
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
        component: () => import('../views/user.vue')
    },
    {
        path: '/message',
        name: 'message',
        component: () => import('../views/message.vue'),
        meta: {
            shouldLogin: true
        }
    }
];