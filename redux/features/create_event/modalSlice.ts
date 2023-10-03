import { createSlice } from "@reduxjs/toolkit";

export enum TicketType {
  PAID = "PAID",
  MIN_PRICE = "MIN_PRICE",
  FREE = "FREE",
}
const modalCreateEventSlice = createSlice({
  name: "modalCreateEvent",
  initialState: {
    isOpenFormat: false,
    isOpenDateTime: false,
    isOpenLocation: false,
    isOpenTicket: false,
    ticketType: TicketType.PAID,
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
    setTicketType: (state, action) => {
      if (
        action.payload === TicketType.PAID ||
        action.payload === TicketType.MIN_PRICE ||
        action.payload === TicketType.FREE
      )
        state.ticketType = action.payload;
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
  setTicketType,
} = modalCreateEventSlice.actions;

export default modalCreateEventSlice.reducer;
