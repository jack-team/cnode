import actions from './../actions/user';
import types from './../types/user';
const tokenKey = `CNODE_ACCESS_TOKEN`;

const access_token = localStorage.getItem(tokenKey);
export default {
    actions,
    state:{
        userInfo:null,
        access_token:access_token,
        isLogin:!!access_token
    },
    mutations:{
        [types.login]( state , {data , access_token} ){
            state.userInfo = data;
            state.isLogin = true;
            state.access_token = access_token;
            localStorage.setItem(tokenKey, access_token );
            return state;
        }
    }
}