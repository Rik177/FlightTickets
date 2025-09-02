import { configureStore } from "@reduxjs/toolkit";
import { flightsSlice } from "./slices";

const store = configureStore({
    reducer: {
        flights: flightsSlice.reducer,
    }
})
export type AppDispatch = typeof store.dispatch;
export default store;