import { CHANGE_FILTER_STATE, CHANGE_FILTER_STATE_FAILURE, CHANGE_FILTER_STATE_SUCCESS } from "../actionType/actions";

const initialState = {
    filter: {
        type: '',
        sortType: '',
        action: ''
    },
    isLoading: false,
    isFailed: false,
}

const filterReducer = (state = initialState, payload: any) => {
    // console.log(payload)
    switch (payload.type) {
        case CHANGE_FILTER_STATE:
            return { ...state, isLoading: true, isFailed: false }
        case CHANGE_FILTER_STATE_SUCCESS:
            return { ...state, filter: payload.filter, isLoading: false, isFailed: false }
        case CHANGE_FILTER_STATE_FAILURE:
            return {
                ...state, filter: {
                    type: '',
                    sortType: '',
                    action: ''
                },
                isLoading: false, isFailed: true
            }
        default:
            return state;
    }
};

export default filterReducer;