import { all, takeEvery } from 'redux-saga/effects';
import { CHANGE_FILTER_STATE, CHANGE_SENSOR_FILTER_STATE } from '../actionType/actions';
import filterSaga from './filterSaga';
import sensorFilterSaga from './sensorFilterSaga';

export default function* rootSaga() {
    yield all([
        takeEvery(CHANGE_FILTER_STATE, filterSaga),
        takeEvery(CHANGE_SENSOR_FILTER_STATE, sensorFilterSaga),
    ]);
}
