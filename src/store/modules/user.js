import actions from './../actions/user';
import types from './../types/user';

const tokenKey = `CNODE_ACCESS_TOKEN`;

const access_token = localStorage.getItem(tokenKey);
export default {
    actions,
    state: {
        userInfo: null,
        access_token: access_token,
        isLogin: !!access_token,
        userSave: {},
        message: {},
        userPath: []
    },
    mutations: {
        [types.login](state, {data, access_token}) {
            state.userInfo = data;
            state.isLogin = true;
            state.access_token = access_token;
            localStorage.setItem(tokenKey, access_token);
            return state;
        },
        [types.getUserInfo](state, {data, loginName}) {
            const userSave = state.userSave;
            userSave[loginName] = data;
            state.userSave = {
                ...userSave
            };
            return state;
        },
        [types.getUserMessage](state, data) {
            state.message = data.data;
            return state;
        },
        [types.unLogin](state) {
            localStorage.setItem(tokenKey, ``);
            state.userInfo = null;
            state.access_token = null;
            state.isLogin = false;
            state.userSave = {};
            state.message = {};
            return state;
        },
        [types.saveUserPath](state, {pre, next}) {
            const set = new Set(state.userPath);
            set.add(pre);
            set.add(next);
            state.userPath=[...set];
        },
        [types.deleteUserPath](state,path){
            const set = new Set(state.userPath);
            set.delete(path);
            state.userPath=[...set];
        }
    }
}