import types from './../types/detail';

export default {
    [types.getDetail]({commit},id){
        ajax.get(`/topic/${id}`,{
            mdrender:true
        }).then(data => {
           commit(types.getDetail,{
               id:id,
               data:data.data
           })
        })
    }

}