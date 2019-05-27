import * as types from './../types/details';
import * as ajax from './../../common/http';
import {
    ActionContext
} from 'vuex';

export default {
    [types.getDetailById](
        context: ActionContext<any, any>,
        payload: string
    ) {
       return (
           ajax.get(`/topic/${payload}`, {
               mdrender: true
           }).
           then(data => {
               context.commit(types.getDetailById,{
                   ...data
               })
           })
       )
    }
}