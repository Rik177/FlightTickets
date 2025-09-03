import { createSlice } from '@reduxjs/toolkit';
import fetchFlights from './thunks';

// import type { PayloadAction } from '@reduxjs/toolkit';



export type Flight = {
    "id": number;
    "from": string;
    "to": string;
    "company": string;
    "price": number;
    "currency": string;
    "time": {
        "startTime": string;
        "endTime": string;
    },
    "duration": number;
    "date": string;
    "connectionAmount": number;
};

export type FlightsItems = {
    items: Flight[];
    visibleItems: number;
    loading: boolean;
    hasMore: boolean;
}

const initialState: FlightsItems = {
    items: [],
    visibleItems: 3,
    loading: false,
    hasMore: true
    }


export const flightsSlice = createSlice({
    name: 'flights', 
    initialState,
    reducers: {
        loadMore: (state) => {
            const nextVisible = state.visibleItems + 3;
            state.visibleItems = Math.min(nextVisible, state.items.length);
            state.hasMore = state.visibleItems < state.items.length;
        },
    },
    extraReducers: (builder) => { 
        builder
            .addCase(fetchFlights.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFlights.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(...action.payload);
                state.visibleItems = Math.min(3, action.payload.length);
                state.hasMore = action.payload.length > 3;
            })
            .addCase(fetchFlights.rejected, (state) => {
                state.loading = false;
                console.warn('oh!');
            });
    }

})

export const { loadMore } = flightsSlice.actions;