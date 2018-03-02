/**
 * Created by jiangtao on 2017/6/12.
 */
import types from './../types/user';

import actions from './../actions/user';

export default {
    actions,
    //初始化状态
    state: {
        detail:{},
        myInfo:{},
        Access_Token:(function () {
            return localStorage.getItem("VUE_CNODE_ACCESS_TOKEN");
        })(),
        messageList:[],
        notMessageNumber:0
    },
    mutations: {
        [types.GET_DETAIL]( state , action ) {
            const { data } = action;
            state.detail = data;
        },
        [types.GET_MY] ( state , action ) {
            const { data } = action;
            state.myInfo = data;

        },
        [types.LOGIN] ( state , action ) {
            const { data } = action;
            localStorage.setItem("VUE_CNODE_ACCESS_TOKEN" , data );
            state.Access_Token = data;
        },
        [types.UNLOGIN] ( state ) {
            localStorage.setItem("VUE_CNODE_ACCESS_TOKEN" , "" );
            state.Access_Token = "";
            state.detail = {};
            state.myInfo = {};
        },
        [types.GET_MESSAGE_LIST] (state ,action ) {
            let { hasnot_read_messages = [] , has_read_messages = [] } = action.data;
            state.messageList = hasnot_read_messages.concat(has_read_messages);
            state.notMessageNumber = hasnot_read_messages.length;
        }
    }
}