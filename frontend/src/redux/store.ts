// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardReducerSlice';
import toastReducer from './toastSlice';

const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        toast: toastReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
