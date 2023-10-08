import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const postCart = createAsyncThunk('cart/postCart', async ({ data, token }: { data: any, token: string | null }) => {
  try {
    const accessToken = token || '';
    const response = await axios.post('http://nawaytes.cloud:8080/cart', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    carts: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(postCart.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload;
      })
      .addCase(postCart.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default cartSlice.reducer;

