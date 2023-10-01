import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './features/registerSlice';
import loginReducer from './features/loginSlice';
import modalCreateEventReducer from "./features/create_event/modalSlice";
import createEventReducer from "./features/create_event/createEventSlice";
import masterDateReducer from "./features/create_event/masterDataSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    modalCreateEvent: modalCreateEventReducer,
    createEvent: createEventReducer,
    masterData: masterDateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
