import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { dequeue } from '../redux/offline/offlineQueueSlice';
import {
  createExpense,
  updateExpenseApi,
  deleteExpenseApi,
} from '../services/expensesApi';

export const useOfflineSync = () => {
  const dispatch = useDispatch();
  const queue = useSelector(
    (state: RootState) => state.offlineQueue
  );

  useEffect(() => {
    const sync = async () => {
      for (const action of queue) {
        try {
          if (action.type === 'CREATE') {
            await createExpense(action.payload);
          }
          if (action.type === 'UPDATE') {
            await updateExpenseApi(action.payload);
          }
          if (action.type === 'DELETE') {
            await deleteExpenseApi(action.payload);
          }
          dispatch(dequeue());
        } catch {
          break;
        }
      }
    };

    if (navigator.onLine && queue.length > 0) {
      sync();
    }
  }, [queue, dispatch]);
};
