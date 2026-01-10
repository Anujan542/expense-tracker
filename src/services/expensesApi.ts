import type { Expense } from '../types/expenseTypes';
import { mockDB } from './mockDB';
import { simulateNetwork } from './api';

import { store } from '../redux/store';
import { enqueue } from '../redux/offline/offlineQueueSlice';

const PAGE_SIZE = 10;

const isOnline = () => navigator.onLine;

export const fetchExpenses = async (page: number) => {
  await simulateNetwork();

  const allExpenses = mockDB.getAll();

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return {
    data: allExpenses.slice(start, end),
    hasMore: end < allExpenses.length,
  };
};


export const createExpense = async (expense: Expense) => {
    if (!isOnline()) {
    store.dispatch(
      enqueue({
        type: 'CREATE',
        payload: expense,
        timestamp: 0
      })
    );

    return expense;
  }
  await simulateNetwork(0.2);
  mockDB.add(expense);
  return expense;
};

export const updateExpenseApi = async (expense: Expense) => {
  await simulateNetwork(0.2);
  mockDB.update(expense);
  return expense;
};

export const deleteExpenseApi = async (id: string) => {
  await simulateNetwork(0.2);
  mockDB.remove(id);
  return id;
};
