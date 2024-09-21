import { createSlice } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';

const initialState = {
  query: '',
  page: 1,
  limit: 24,
  sort: 'name', // Default sort
  // Add more fields as needed, like filters, etc.
};

const querySlice = createSlice({
  name: 'queryParams',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    // You can add additional reducers for other filters like categories or price range
  },
});

// Export actions and the reducer
export const { setQuery, setPage, setLimit, setSort } = querySlice.actions;
export const queryReducer = querySlice.reducer;
