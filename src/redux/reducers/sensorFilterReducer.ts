import { CHANGE_SENSOR_FILTER_STATE, CHANGE_SENSOR_FILTER_STATE_FAILURE, CHANGE_SENSOR_FILTER_STATE_SUCCESS } from "../actionType/actions";


const initialState = {
    filter: {
        type: '',
        sortType: '',
    },
    isLoading: false,
    isFailed: false,
}

const sensorFilterReducer = (state = initialState, payload: any) => {
    console.log(payload)
    switch (payload.type) {
        case CHANGE_SENSOR_FILTER_STATE:
            return { ...state, isLoading: true, isFailed: false }
        case CHANGE_SENSOR_FILTER_STATE_SUCCESS:
            return { ...state, filter: payload.filter, isLoading: false, isFailed: false }
        case CHANGE_SENSOR_FILTER_STATE_FAILURE:
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

export default sensorFilterReducer;