import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

export default new VueRouter({
    routes: routes,
    mode: !!__DEV__ ? `hash` : `history`
})

