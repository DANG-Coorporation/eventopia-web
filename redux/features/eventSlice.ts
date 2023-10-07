import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getEvents = createAsyncThunk('event/getEvents', async () => {
  try {
    const response = await axios.get(
      'http://nawaytes.cloud:8080/event?page=1&limit=12&name&provinceId=&cityId='
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    events: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(getEvents.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default eventSlice.reducer;
