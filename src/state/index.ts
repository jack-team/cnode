import Vue from 'vue';
import Vuex, {
    Store,
    StoreOptions
} from 'vuex';

Vue.use(Vuex);

import topics from './modules/topics';
import details from './modules/details';

import createPersistedState from 'vuex-persistedstate';

const options:StoreOptions<any> = {
    plugins: [createPersistedState({
        storage: sessionStorage
    })],
    modules: {
        topics,
        details
    }
}

export default new Store(options);

