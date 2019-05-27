import actions from '../actions/topics';
import * as types from '../types/topics';

import {
    TopicRes,
    TopicData,
    TopicsState
} from '../interface/topics';

export default {
    actions,
    state: {
        tabData: {} as TopicsState
    },
    mutations: {
        [types.getTopicList](
            sate: TopicsState,
            playLoad: TopicRes
        ) {
            const {
                List,
                isPush,
                Tab,
                Page
            } = playLoad;

            const {
                tabData
            } = sate;

            const Data: TopicData = tabData[Tab] || {};

            const {list = []} = Data;

            const newList = isPush ? list.concat(List) : List

            sate.tabData = {
                ...tabData,
                [Tab]: {
                    page: Page,
                    list: newList
                }
            }
        }
    }
}