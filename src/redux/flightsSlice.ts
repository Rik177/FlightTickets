import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchFlights from './thunks';


export type Flight = {
    id: number;
    from: string;
    to: string;
    company: string;
    price: number;
    currency: string;
    time: {
        startTime: string;
        endTime: string;
    };
    duration: number;
    date: string;
    connectionAmount: number;
};



export type FlightsExtraState = {
    loading: boolean;
    error: string | null;
    offset: number;
    limit: number;
    hasMore: boolean;
};

const flightsAdapter = createEntityAdapter<Flight>();

const initialState = flightsAdapter.getInitialState<FlightsExtraState>({
    loading: false,
    error: null,
    offset: 0,
    limit: 3,
    hasMore: true,
});


const flightsSlice = createSlice({
    name: 'flights',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFlights.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFlights.fulfilled, (state, action) => {
                state.loading = false;
                flightsAdapter.addMany(state, action.payload);
                state.offset += state.limit;

                if (action.payload.length < state.limit) {
                    state.hasMore = false;
}
            })
            .addCase(fetchFlights.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const itemsSelectors = flightsAdapter.getSelectors(
    (state: { items: ReturnType<typeof flightsSlice.reducer> }) => state.items
);


export default flightsSlice.reducer;
