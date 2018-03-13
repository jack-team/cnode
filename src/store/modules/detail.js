import actions from './../actions/detail';
import types from './../types/detail';

export default {
    actions,
    state:{
        desc:{}
    },
    mutations:{
        [types.getDetail]( state , action ) {
            state.desc[action.id]=action.data;
            state.desc = Object.assign({},state.desc);
        }
    }
}