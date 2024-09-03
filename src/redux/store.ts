import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rideReducer } from './reducer';
import { watchRideActions } from './saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rideReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchRideActions);

export default store;
