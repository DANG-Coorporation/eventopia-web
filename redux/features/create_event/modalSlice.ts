import { createSlice } from "@reduxjs/toolkit";

const modalCreateEventSlice = createSlice({
  name: "modalCreateEvent",
  initialState: {
    isOpenFormat: false,
    isOpenDateTime: false,
    isOpenLocation: false,
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
  },
});

export const {
  openFormat,
  closeFormat,
  openDateTime,
  closeDateTime,
  openLocation,
  closeLocation,
} = modalCreateEventSlice.actions;

export default modalCreateEventSlice.reducer;
