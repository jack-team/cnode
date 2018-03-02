/**
 * Created by jiangtao on 2017/6/9.
 */
import types from './../types/detail';

export default {
    [ types.GET_DETAIL ]( { commit }  , params ){
        const callback = params.callback || function () {};
        const { id , accesstoken  , status="init"} = params;
        status === "init" && loading();
        return ajax.get({
            url:"/topic/"+ id ,
            data:{
                accesstoken: accesstoken
            }
        }).then(( res )=> {
            if(! res.success ) return;
            commit( types.GET_DETAIL, {
                data:res.data,
            });
            setTimeout( ()=> callback("ok") , 10 );
        }).always(( )=> {
            loadingClose();
        }).fail(( erro )=> {
            setTimeout( ()=> callback("erro") , 10 );
        })

    },
    [types.GOOD_UP] ( { commit } , { id , accesstoken } ) {
        ajax.post({
            url:"/reply/" + id +"/ups",
            data:{
                accesstoken:accesstoken
            }
        }).then(( res )=>{
            if(!res.success) return;
            commit(types.GOOD_UP,{
                id:id,
                action:res.action
            })
        }).fail((e)=>{
            alert("不能为自己点赞");
        });
    },
    [types.CLEAR_DETAIL]({ commit }){
        commit(types.CLEAR_DETAIL);
    },
    [types.CREATE_COMMENT] ({commit} , { id ,content , replieId , accesstoken , cb }) {
        return ajax.post({
            url:'/topic/'+id+'/replies',
            data:{
                reply_id:replieId,
                content:content,
                accesstoken
            }
        }).then( ( res ) => {
            if(res.success) {
                cb();
            }
        });
    }
}