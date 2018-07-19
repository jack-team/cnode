/**
 * Created by jiangtao on 2017/5/17.
 */

import Vue from 'vue';
import routers from './routes';
import VueRouter from 'vue-router';
import Scene from './../components/Scene';
import LazyLoad from '../components/LazyLoad';

const baseRoute = (routers, roots = []) => {
    const notPath = `/topic/good`;
    const others = (
        routers.map(route => {
            const {
                component
            } = route;
            if (component) {
                route.component = LazyLoad(component)
            }
            return route;
        })
    );
    roots.push({
        path: `/`,
        name: `root`,
        children: others,
        component: Scene,
        redirect: notPath,
    });
    roots.push({
        path: `*`,
        name: `404`,
        redirect: notPath
    });
    return roots;
};

Vue.use(VueRouter);

export default new VueRouter({
    mode: __DEV__ ? `hash` : `history`,
    base: !__DEV__ ? `/site` : ``,
    routes: baseRoute(routers)
});


