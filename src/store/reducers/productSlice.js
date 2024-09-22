import ProductServices from '@/helper/network/services/ProductServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async action to fetch products with a search query
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (query, { rejectWithValue }) => {
    try {
      const response = await ProductServices.getShowingProducts(query);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    isLoading: false,
    error: null,
    query: '',  // Local query state
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;  // Set the query locally
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { setQuery } = productSlice.actions;
export const productReducer = productSlice.reducer;
