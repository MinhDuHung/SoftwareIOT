import { call, delay, put } from 'redux-saga/effects'
import { CHANGE_FILTER_STATE_FAILURE, CHANGE_FILTER_STATE_SUCCESS, CHANGE_SENSOR_FILTER_STATE_FAILURE, CHANGE_SENSOR_FILTER_STATE_SUCCESS } from '../actionType/actions'


function* callApi(action: any) {
    try {
        yield put({ type: CHANGE_SENSOR_FILTER_STATE_SUCCESS, filter: action.payload })
    } catch (error) {
        console.error(error)
        yield put({ type: CHANGE_SENSOR_FILTER_STATE_FAILURE })
    }

}
export default function* (action: any) {
    yield call(callApi, action)
}
