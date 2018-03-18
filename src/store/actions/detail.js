import types from './../types/detail';

export default {
    [types.getDetail]({commit},id){
        ajax.get(`/topic/${id}`,{
            mdrender:true
        }).then(res => {
           let { replies } = res.data;
           replies.reverse();
           const data={
               ...res.data,
               replies
           };
           commit(types.getDetail,{
               id:id,
               data:data
           })
        })
    }

}