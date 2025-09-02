import { createAsyncThunk } from '@reduxjs/toolkit';


const fetchFlights = createAsyncThunk(
    'flights/fetch',
    async () => { 
        const res = await fetch('http://localhost:3001/tickets');
        const data = await res.json();
        return data;
    }
)

export default fetchFlights;