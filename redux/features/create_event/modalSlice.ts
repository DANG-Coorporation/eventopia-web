import { createSlice } from "@reduxjs/toolkit";

const modalCreateEventSlice = createSlice({
  name: "modalCreateEvent",
  initialState: {
    isOpenFormat: false,
    isOpenDateTime: false,
    isOpenLocation: false,
    isOpenTicket: false,
  },
  reducers: {
    openFormat: (state) => {
      state.isOpenFormat = true;
    },
    closeFormat: (state) => {
      state.isOpenFormat = false;
    },
    openDateTime: (state) => {
      state.isOpenDateTime = true;
    },
    closeDateTime: (state) => {
      state.isOpenDateTime = false;
    },
    openLocation: (state) => {
      state.isOpenLocation = true;
    },
    closeLocation: (state) => {
      state.isOpenLocation = false;
    },
    openTicket: (state) => {
      state.isOpenTicket = true;
    },
    closeTicket: (state) => {
      state.isOpenTicket = false;
    },
  },
});

export const {
  openFormat,
  closeFormat,
  openDateTime,
  closeDateTime,
  openLocation,
  closeLocation,
  openTicket,
  closeTicket,
} = modalCreateEventSlice.actions;

export default modalCreateEventSlice.reducer;
