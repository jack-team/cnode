import actions from './../actions/home';
import types from './../types/home';


const category = [`good`, `share`, `ask`, `job`, `dev`];

const initState = {};

category.forEach(key => {
    initState[key] = {
        list: [],
        page: 0,
        pageY: 0
    }
});

export default {
    actions,
    state: initState,
    mutations: {
        [types.getTopicList](state, action) {
            const { type, page, list, category } = action;
            state[category].page = page;
            if (type === `refresh`) {
                state[category].list = list;
            }
            else {
                const topic = state[category];
                let topicList = topic.list;
                state[category].list = topicList.concat(list);
            }
        },
        [types.savePageScrollY](state, action) {
            const {scrollY, category} = action;
            state[category].pageY = scrollY;
        }
    }
}