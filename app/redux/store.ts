import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./noteState/noteSlice";
export const store = configureStore({
  reducer: {
    // reference reducers here
    notes: noteReducer,
  },
});

// create types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
