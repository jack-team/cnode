/**
 * Created by jiangtao on 2017/6/11.
 */
import types from './../types/detail';

import actions from './../actions/detail';

export default {
    actions,
    //初始化状态
    state: {
       detail:{}
    },
    mutations: {
        [types.GET_DETAIL]( state , action ) {
            const { data } = action;
            state.detail = data;
        },
        [types.GOOD_UP] ( state , actions ) {

            const { id , action } = actions;

            let $index = 0;

            state.detail.replies.some(( val , index )=>{
                if(val.id  == id ) {
                    $index = index;
                    return true;
                };
            });

            if( action == "up" ) {
                state.detail.replies[$index].is_uped = true;
                state.detail.replies[$index].ups.push(id);
            } else {
                state.detail.replies[$index].is_uped = false;
                state.detail.replies[$index].ups.splice(0,1);
            };
        },
        [types.CLEAR_DETAIL](state){
            state.detail = {};
        }
    },

}