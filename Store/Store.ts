import { configureStore, combineReducers } from "@reduxjs/toolkit";
import ParkingSpaceReducer from "../Features/parkingSpace/parkingSpaceSlice";

const rootReducers = combineReducers({
  ParkingSpace: ParkingSpaceReducer,
});

export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;