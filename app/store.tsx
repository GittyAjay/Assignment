import {configureStore} from '@reduxjs/toolkit';
import {homePageReducer} from './page/Home/Home.action';

export const store = configureStore({
  reducer: {homePageData: homePageReducer},
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
