import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Flight } from './flightsSlice';
import type { RootState } from './store'


const fetchFlights = createAsyncThunk<
        Flight[], 
        void,   
        { state: RootState }
    >(
    'flights/fetch',
    async (_, { getState, rejectWithValue }) => {

        const { offset, limit } = getState().flights;

        try {
            const res = await fetch(`http://localhost:3001/tickets?_limit=${limit}&_start=${offset}`);

            if (!res.ok) {
                throw new Error(`Ошибка запроса: ${res.status}`);
            }

            const data: Flight[] = await res.json();
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }

    
    }
);


export default fetchFlights;
