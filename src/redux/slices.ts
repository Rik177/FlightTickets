import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import fetchFlights from './thunks';
import type { RootState } from '../redux/store'; // <-- правильно импортируем RootState

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

export type FlightsResponse = {
    data: Flight[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
};

type FlightsState = {
    loading: boolean;
    addedItems: Flight[];
    pagination?: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
};

const flightsAdapter = createEntityAdapter<Flight>();

const initialState = flightsAdapter.getInitialState<FlightsState>({
    loading: false,
    addedItems: [],
    pagination: undefined,
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
            .addCase(fetchFlights.fulfilled, (state, action: PayloadAction<FlightsResponse>) => {
                state.loading = false;
                if (action.payload) {
                    
                    if (action.payload.pagination.currentPage === 1) {
                        state.addedItems = action.payload.data;
                    } else {
                        
                        const existingIds = new Set(state.addedItems.map(item => item.id));
                        const newItems = action.payload.data.filter(item => !existingIds.has(item.id));
                        state.addedItems = [...state.addedItems, ...newItems];
                    }
                    state.pagination = action.payload.pagination;
                }
            })
            .addCase(fetchFlights.rejected, (state) => {
                state.loading = false;
                console.warn('Ошибка загрузки!');
            });
    },
});

export const flightsReducer = flightsSlice.reducer;
export const flightsActions = flightsSlice.actions;
export { flightsSlice };

export const {
    selectAll: selectAllFlights,
    selectById: selectFlightById,
    selectIds: selectFlightIds,
} = flightsAdapter.getSelectors<RootState>((state) => state.flights);
