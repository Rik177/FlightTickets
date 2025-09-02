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

type FlightsState = Flight[];

const initialState: FlightsState = [];



export const flightsSlice = createSlice({
    name: 'flights', 
    initialState,
    reducers: {
        clearFlights: (state) => {
            state.length = 0; 
        }
    },
    extraReducers: (builder) => { 
        builder
            .addCase(fetchFlights.fulfilled, (state, action) => { 
                state.push(...action.payload);
            })
            .addCase(fetchFlights.rejected, () => {
                console.log('Oh!')
            });
    }

})

// export const { addFlights } = flightsSlice.actions;