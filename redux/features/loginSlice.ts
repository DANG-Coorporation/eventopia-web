import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ILogin } from '@/types';

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (user: ILogin) => {
    try {
      const response = await axios.post(
        'http://nawaytes.cloud:8080/auth/login',
        user
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.user = {};
      });
  },
});

export default loginSlice.reducer;
