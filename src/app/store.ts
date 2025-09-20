import { configureStore } from '@reduxjs/toolkit';
import { API } from './api';
import { modeSelectSlice } from '../widgets/mode-select/model/slice';
import { etlInitSlice } from '../widgets/etl-init/model/slice';

export const store = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
    [modeSelectSlice.reducerPath]: modeSelectSlice.reducer,
    [etlInitSlice.reducerPath]: etlInitSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
