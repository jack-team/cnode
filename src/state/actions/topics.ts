import {
    ActionContext
} from 'vuex';
import * as types from '../types/topics';
import * as ajax from './../../common/http';

import {
    DataNode,
    TopicPayLoad
} from '../interface/topics'

//获取首页列表
export default {
    [types.getTopicList](
        context: ActionContext<any, any>,
        payload: TopicPayLoad
    ) {
        const {
            tab,
            page = 1,
            limit = 20,
        } = payload;
        return ajax.get(`/topics`, {
            tab,
            page,
            limit,
        }).
        then((
            list: Array<DataNode>
        ) => {
            const playLoad = {
                Tab:tab,
                List: list,
                Page:page,
                isPush: page > 1
            }
            context.commit(
                types.getTopicList,
                playLoad
            )
            return list;
        })
    }
}