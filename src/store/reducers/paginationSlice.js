// src/redux/paginationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    "products": { currentPage: 1, totalCount: 0, pageSize: 10 }
};

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            const { id, currentPage } = action.payload;
            if (!state[id]) {
                state[id] = { currentPage: 1, totalCount: 0, pageSize: 10 };
            }
            state[id].currentPage = currentPage;
        },
        setTotalCount: (state, action) => {
            const { id, totalCount } = action.payload;
            if (!state[id]) {
                state[id] = { currentPage: 1, totalCount: 0, pageSize: 10 };
            }
            state[id].totalCount = totalCount;
        },
        setPageSize: (state, action) => {
            const { id, pageSize } = action.payload;
            if (!state[id]) {
                state[id] = { currentPage: 1, totalCount: 0, pageSize: 10 };
            }
            state[id].pageSize = pageSize;
        },
    },
});

export const { setCurrentPage, setTotalCount, setPageSize } = paginationSlice.actions;

export const paginationReducer = paginationSlice.reducer;


