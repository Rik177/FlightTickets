import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Flight, FlightsResponse } from './slices';

type fetchProps = { 
    page: number;
    limit: number;
};

const fetchFlights = createAsyncThunk<FlightsResponse, fetchProps>(
    'flights/fetch',
    async ({ page = 1, limit = 3 }) => {
        // Получаем только нужную страницу
        const url = `http://localhost:3001/tickets?_page=${page}&_limit=${limit}`;
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: Flight[] = await res.json();
        // Получаем общее количество билетов из заголовка
        const totalItems = Number(res.headers.get('X-Total-Count')) || data.length;
        const totalPages = Math.ceil(totalItems / limit);

        return {
            data,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems,
                itemsPerPage: limit,
            },
        };
    }
);


export default fetchFlights;
