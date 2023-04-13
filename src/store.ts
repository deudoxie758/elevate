import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import gifReducer from "./feautures/gifs/gifSlice";

export const store = configureStore({
  reducer: {
    gifs: gifReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
