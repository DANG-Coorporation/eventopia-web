import { IEvent } from "@/common/interface/createEvent.interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IEvent = {
  name: "",
  formatId: 0,
  topicId: 0,
  coverUrl: "",
  isPublic: true,
  eventStartDateTime: "",
  eventEndDateTime: "",
  address: "",
  cityId: 0,
  provinceId: 0,
  latitude: "",
  longitude: "",
  description: "",
  isTermsAndConditions: true,
  termAndCondition: "",
  isFullName: true,
  isEmail: true,
  isPhoneNumber: false,
  isIdentityNumber: false,
  isDob: false,
  isGender: false,
  maxPerbuy: 3,
  isOneEmailOneTransaction: false,
  isOneTicketOneData: false,
  eventTickets: [],
};

const createEventSlice = createSlice({
  name: "createEvent",
  initialState,
  reducers: {
    setNameCreateEvent: (state, action) => {
      state.name = action.payload;
    },
    setEvent(state, action) {
      return action.payload;
    },
  },
});

export const { setNameCreateEvent, setEvent } = createEventSlice.actions;
export default createEventSlice.reducer;
