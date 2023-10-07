import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './features/registerSlice';
import loginReducer from './features/loginSlice';
import eventReducer from './features/eventSlice';
import modalCreateEventReducer from './features/create_event/modalSlice';
import createEventReducer from './features/create_event/createEventSlice';
import masterDateReducer from './features/create_event/masterDataSlice';
import openStreetMapReducer from './features/open_street_map/openStreetMapSlice';
import postCoverReducer from './features/create_event/uploadCoverSlice';

export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    event: eventReducer,
    modalCreateEvent: modalCreateEventReducer,
    createEvent: createEventReducer,
    masterData: masterDateReducer,
    openStreetMap: openStreetMapReducer,
    coverCreateEvent: postCoverReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
