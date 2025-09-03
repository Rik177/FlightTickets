import { configureStore } from "@reduxjs/toolkit";
import { flightsSlice } from "./slices";
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
const store = configureStore({
    reducer: {
        flights: flightsSlice.reducer,
    }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;