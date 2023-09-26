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

export const verifyUser = createAsyncThunk(
  'login/verifyUser',
  async (token: string) => {
    try {
      const response = await axios.post(
        'http://nawaytes.cloud:8080/auth/check-token',
        token,
        {
          headers: {
            'Content-Type': 'text/plain',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: {},
    loading: false,
    token: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.user = {};
        state.token = '';
      });
  },
});

export default loginSlice.reducer;
