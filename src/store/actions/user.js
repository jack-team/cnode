import types from './../types/user';

export default  {
    [types.login]({commit} , token ){
        return ajax.post('/accesstoken',{
            accesstoken:token
        }).then( data => {
            commit(types.login,{
                data:data,
                access_token:token
            });
            return data;
        });
    },
    [types.getUserInfo]({commit},loginName){
        return ajax.get(`/user/${loginName}`).then(data=>{
            commit(types.getUserInfo,{
                data:data.data,
                loginName:loginName
            });
        });
    },
    [types.getUserMessage]({commit},token){
        return ajax.get(`/messages`,{
            accesstoken:token,
            mdrender:true
        }).then(data => {
            commit(types.getUserMessage,{
                data:data.data
            })
        })
    }
}