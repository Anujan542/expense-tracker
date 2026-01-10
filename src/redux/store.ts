import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "../redux/expenses/expensesSlice";
import offlineQueueReducer from "../redux/offline/offlineQueueSlice";
import { offlinePersistenceMiddleware } from "./offline/offlineQueueMiddleware";

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    offlineQueue: offlineQueueReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(offlinePersistenceMiddleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
