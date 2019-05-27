import LazyLoad from './../components/LazyLoad';

import Scene from './../components/Scene.vue';
import Topics from './../views/topics';

const configs: Array<any> = [
    {
        name: 'topic',
        path: '/topic/:tab',
        meta: {
            keepAlive: true
        },
        component: Topics
    },
    {
        name: 'details',
        path: '/details/:id',
        component: LazyLoad(() => import('./../views/details'))
    }
]


export default [{
    path: `/`,
    component: Scene,
    children: configs,
    redirect: `/topic/all`
}]
