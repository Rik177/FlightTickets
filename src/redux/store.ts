import { configureStore } from "@reduxjs/toolkit";
import flightsReducer from "./flightsSlice";
import filtersReducer from "./filtersSlice";
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
const store = configureStore({
    reducer: {
        flights: flightsReducer,
        filters: filtersReducer
    }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;