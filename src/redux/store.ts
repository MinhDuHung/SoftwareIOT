import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import filterReducer from "./reducers/filterReducer";
import sagas from './sagas/rootSaga'
import sensorFilterReducer from "./reducers/sensorFilterReducer";

const rootReducer: any = combineReducers({
    filterReducer,
    sensorFilterReducer
});


const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagas)

