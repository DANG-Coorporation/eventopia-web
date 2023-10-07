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

export const getEventById = createAsyncThunk('event/getEventById', async (uniqueId: string | string[]) => {
  try {
    const response = await axios.get(`http://nawaytes.cloud:8080/event/uniq-id/${uniqueId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const postEventTicket = createAsyncThunk('event/postEventTicket', async (data: any) => {
  try {
    const response = await axios.post('http://nawaytes.cloud:8080/cart', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
})

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    events: [],
    event: {},
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
      })
      .addCase(getEventById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(getEventById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(postEventTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(postEventTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(postEventTicket.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default eventSlice.reducer;
