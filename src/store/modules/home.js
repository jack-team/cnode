import actions from './../actions/home';
import types from './../types/home';


const category = [`good`, `share`, `ask`, `job`, `dev`];

const initState = {};

category.forEach(key => {
    initState[key] = {
        list: [],
        page: 0,
        pageY: 0,
        isLastPage: false
    }
});

export default {
    actions,
    state: initState,
    mutations: {
        [types.getTopicList](state, action) {
            const {
                type,
                page,
                list,
                category,
                isLastPage
            } = action;

            const categoryState = state[category];
            categoryState.page = page;
            categoryState.isLastPage = isLastPage;
            const topicList = categoryState.list;

            if (type === `refresh`) {
                categoryState.list = list;
            }
            else {
                categoryState.list = topicList.concat(list);
            }
            state[category] = categoryState;
        },
        [types.savePageScrollY](state, action) {
            const {scrollY, category} = action;
            state[category].pageY = scrollY;
        }
    }
}