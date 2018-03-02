/**
 * Created by jiangtao on 2017/5/19.
 */

import types from './../types/index';

import actions from './../actions/index';

export default {
    actions,
    //初始化状态
    state: {
        itemList:[],
        tabList:[
            { name:"精华",category:"good" },
            { name:"分享",category:"share" },
            { name:"问答",category:"ask" },
            { name:"招聘",category:"job" },
            { name:"测试",category:"dev" }
        ]
    },
    mutations: {
        [types.GET_LIST]( state , action ) {
            const { type , data } = action;

            if(type == "init") {
                state.itemList = data;
            } else {
                state.itemList = state.itemList.concat(data);
            }
        },
        [types.CLEAR_LIST] ( state ){
            state.itemList = [];
        },
        [types.SHOW_LIST] (state , action ){
            let newList = [];
            for(let i = 0 ; i < state.itemList.length ; i ++  ) {
                newList.push({
                    ...state.itemList[i],
                    show:true
                });
            }
            state.itemList = newList;
        }
    },

}