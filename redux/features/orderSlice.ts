import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrder = createAsyncThunk(
  'order/createOrder', async(order: any) => {
    try {
      const response = await axios.post('http://nawaytes.cloud:8080/order', order);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
      });
  }
})

export default orderSlice.reducer;