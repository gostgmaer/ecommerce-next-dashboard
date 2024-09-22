
import masterServices from '@/helper/services/masterDataServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunks for async actions
export const fetchCategory = createAsyncThunk('master/Categories', async (token, { rejectWithValue }) => {
    try {
        const response = await masterServices.getAllcategories({}, {}, token);
        return response.results;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const fetchBrands = createAsyncThunk('master/Brands', async (token, { rejectWithValue }) => {
    try {
        const response = await masterServices.getAllBrands({}, {}, token);
        return response.results;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});



// Initial state
const initialState = {
    categories: [],
    brands: [],
    status: 'idle',
    error: null,
};

// Wishlist slice
const masterSlicer = createSlice({
    name: 'master',
    initialState,
    reducers: {
        clearMaster(state) {
            state.categories = [];
            state.brands = [];
        },
    },
    extraReducers: (builder) => {
        // Handle 
        builder
            .addCase(fetchCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        builder
            .addCase(fetchBrands.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.brands = action.payload;
            })
            .addCase(fetchBrands.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });


    },
});

// Export actions and reducer
export const { clearMaster } = masterSlicer.actions;
export const masterReducer = masterSlicer.reducer;
