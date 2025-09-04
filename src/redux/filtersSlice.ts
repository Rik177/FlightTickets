import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
    companies: string[];
    transfers: Array<number | null>;
    tab: string;
}

const initialState: FiltersState = {
    companies: [],
    transfers: [],
    tab: 'Самый дешёвый',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCompany(state, action: PayloadAction<string>) {
            if (state.companies.includes(action.payload)) {
                state.companies = state.companies.filter(c => c !== action.payload);
            } else {
                state.companies.push(action.payload);
            }
        },
        setTransfer(state, action: PayloadAction<number | null>) {
            if (state.transfers.includes(action.payload)) {
                state.transfers = state.transfers.filter(t => t !== action.payload);
            } else {
                state.transfers.push(action.payload);
            }
        },
        setTab(state, action: PayloadAction<string>) {
            state.tab = action.payload;
        },
        resetFilters(state) {
            state.companies = [];
            state.transfers = [];
            state.tab = 'Самый дешёвый';
        }
    }
});

export const { setCompany, setTransfer, setTab, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
