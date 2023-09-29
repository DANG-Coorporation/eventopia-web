import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './features/registerSlice';
import loginReducer from './features/loginSlice';
import modalCreateEventReducer from "./features/create_event/modalSlice";
export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    modalCreateEvent: modalCreateEventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
