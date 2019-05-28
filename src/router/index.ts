import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

export default new VueRouter({
    routes: routes,
    base: !__DEV__ ? `/site/` : ``,
    mode: !!__DEV__ ? `hash` : `history`
})

