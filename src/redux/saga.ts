import { call, put, takeEvery } from 'redux-saga/effects';
import { SELECT_RIDE, setTotalPrice, FETCH_RIDE_DATA_REQUEST, SET_RIDE_DATA, SelectRideAction, setRideData } from './actions';
import { API_URL } from '@env';

console.log("API_URL-----", API_URL)

// Saga to handle the API call
function* fetchRideData(): Generator<unknown, void, unknown> {
    try {
        const response = yield call(() => fetch(API_URL).then(res => res.json()));
        // Handle the json response data
        const data = response as { userId: number; id: number; title: string; completed: boolean };
        console.log('Fetched data:', data);
        yield put(setRideData(data));
    } catch (error) {
        console.error('API call failed', error);
    }
}

function* handleSelectRide(action: SelectRideAction): Generator<unknown, void, unknown> {
    const { id, price } = action.payload;
    yield put(setTotalPrice(price));
}

export function* watchRideActions(): Generator<unknown, void, unknown> {
    yield takeEvery(SELECT_RIDE, handleSelectRide);
    yield takeEvery(FETCH_RIDE_DATA_REQUEST, fetchRideData);
}
