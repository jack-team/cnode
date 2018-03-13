import actions from './../actions/home';
import types from './../types/home';


export default {
    actions,
    state:{
        good:{
            list:[],
            page:0,
            pageY:0
        },
        share:{
            list:[],
            page:0,
            pageY:0
        },
        ask:{
            list:[],
            page:0,
            pageY:0
        },
        job:{
            list:[],
            page:0,
            pageY:0
        },
        dev:{
            list:[],
            page:0,
            pageY:0
        }
    },
    mutations:{
        [types.getTopicList](state , action){
           const { type , page , list , category } = action;

           if(type === `refresh`) {
               state[category].list=list;
           } else {
               const categoryState=state[category];
               let categoryList= categoryState.list;
               state[category].list=categoryList.concat(list);
           }
           state[category].page = page;
        },
        [types.savePageScrollY](state , action){
            const {  scrollY,category } = action;
            state[category].pageY=scrollY;
        }
    }
}