export const SELECT_RIDE = 'SELECT_RIDE';
export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';
export const SET_RIDE_DATA = 'SET_RIDE_DATA';
export const FETCH_RIDE_DATA_REQUEST = 'FETCH_RIDE_DATA_REQUEST';

export interface SelectRideAction {
    type: typeof SELECT_RIDE;
    payload: { id: string; price: number };
}

export interface SetTotalPriceAction {
    type: typeof SET_TOTAL_PRICE;
    payload: number;
}

export interface SetRideDataAction {
    type: typeof SET_RIDE_DATA;
    payload: { userId: number; id: number; title: string; completed: boolean };
}

export interface FetchRideDataRequestAction {
    type: typeof FETCH_RIDE_DATA_REQUEST;
}

export type RideActions = SelectRideAction | SetTotalPriceAction | SetRideDataAction;

export const selectRide = (id: string, price: number): SelectRideAction => ({
    type: SELECT_RIDE,
    payload: { id, price },
});

export const setTotalPrice = (totalPrice: number): SetTotalPriceAction => ({
    type: SET_TOTAL_PRICE,
    payload: totalPrice,
});

export const setRideData = (data: { userId: number; id: number; title: string; completed: boolean }): SetRideDataAction => ({
    type: SET_RIDE_DATA,
    payload: data,
});
export const fetchRideDataRequest = (): FetchRideDataRequestAction => ({
    type: FETCH_RIDE_DATA_REQUEST,
});