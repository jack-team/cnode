/**
 * Created by jiangtao on 2017/6/12.
 */
import types from './../types/user';

export default {

    [ types.GET_DETAIL ]( { commit }  , params ){
        const callback = params.callback || function () {};
        const { id } = params;
        loading();
        ajax.get({
            url:"/user/"+ id ,
        }).then(( res )=> {
            if(! res.success ) return;
            commit( types.GET_DETAIL, {
                data:res.data,
            });
            setTimeout( ()=> callback("ok") , 10 );
        }).always(()=> {
            loadingClose();
        }).fail(( erro )=>{
            setTimeout( ()=> callback("erro") , 10 );
        })
    },

    [types.GET_MY] ( { commit } , accesstoken ) {
        ajax.post({
            url:'/accesstoken',
            data:{
                accesstoken
            }
        }).then(( res )=>{
            if(!res.success) return;
            commit( types.GET_MY, {
                data:res
            });
        }).always(()=>{

        })
    },

    [types.LOGIN] ( { commit } , { accesstoken , callback=()=>{} } ) {
        return ajax.post({
            url:'/accesstoken',
            data:{
                accesstoken
            }
        }).then(( res )=>{
            if(!res.success) return;
            commit( types.LOGIN, {
                data:accesstoken
            });
            callback();
        }).always(()=>{

        }).fail(( res )=>{
            let { responseText } = res;
            alert(JSON.parse(responseText).error_msg)
        })
    },

    [types.UNLOGIN] ({ commit } ) {
        commit( types.UNLOGIN);
    },
    [types.GET_MESSAGE_LIST] ({commit} , { accesstoken }) {
        return ajax.get({
            url:"/messages",
            data:{
                accesstoken
            }
        }).then(( res )=>{
            if(res.success) {
                commit(types.GET_MESSAGE_LIST , {
                    data:res.data
                })
            };
        })
    }

}