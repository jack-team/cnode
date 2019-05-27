import actions from '../actions/details';
import * as types from './../types/details';
import {
    DetailsState,
    DetailsData
} from './../interface/details';

export default {
    actions,
    state: {
        detail: {}
    } as DetailsState,
    mutations: {
        [types.getDetailById](
            state: DetailsState,
            payload: DetailsData
        ) {
            const {
                id
            } = payload;
            const {
                detail
            } = state;
            state.detail = {
                ...detail,
                [id]:payload
            }
        }
    }
}