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
    }
}