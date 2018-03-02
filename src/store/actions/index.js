/**
 * Created by jiangtao on 2017/6/9.
 */
import types from './../types/index';

export default {
    //获取首页列表
    [ types.GET_LIST ]( { commit }  , params ){
        const {
            page ,
            type,
            category ,
            callback = ()=>{}
        } = params;
        if( type == "init") {
            commit(types.CLEAR_LIST)
        }
        return ajax.get({
            url:"/topics",
            data:{
                limit:30,
                tab:category,
                page:page
            }
        }).then( ( ret ) => {
            let { success , data } = ret;
            if(! success) return;
            commit( types.GET_LIST, { data, type });
            setTimeout( ()=> callback() , 1 );
        });
    },
    [types.CREATE_TOPICS] ({ commit }  , params  ) {
        const { callback , data } = params;
        return ajax.post({
            url:"/topics",
            data:data
        }).then(( data )=> {
            callback(data);
        });
    },
    [types.SHOW_LIST] ({ commit } , params ) {
        commit(types.SHOW_LIST , {  data:params });
    }
}