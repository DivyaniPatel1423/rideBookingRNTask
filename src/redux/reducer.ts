import { RideActions, SELECT_RIDE, SET_TOTAL_PRICE, SET_RIDE_DATA } from './actions';

interface RideState {
    selectedRides: string[];
    totalPrice: number;
    totalAmount: number;
    rideData?: { userId: number; id: number; title: string; completed: boolean };
}

const initialState: RideState = {
    selectedRides: [],
    totalPrice: 0,
    totalAmount: 0
};

export const rideReducer = (state = initialState, action: RideActions): RideState => {
    switch (action.type) {
        case SELECT_RIDE: {
            const { id, price } = action.payload;
            const isSelected = state.selectedRides.includes(id);
            const updatedRides = isSelected
                ? state.selectedRides.filter((rideId) => rideId !== id)
                : [...state.selectedRides, id];
            return {
                ...state,
                selectedRides: updatedRides,
                totalPrice: isSelected
                    ? state.totalPrice - price
                    : state.totalPrice + price,
            };
        }
        case SET_TOTAL_PRICE:
            return {
                ...state,
                totalAmount: action.payload,
            };
        case SET_RIDE_DATA:
            return {
                ...state,
                rideData: action.payload,
            };
        default:
            return state;
    }
};
