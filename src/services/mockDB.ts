import type { Category, Expense } from "../types/expenseTypes";
import { v4 as uuid } from 'uuid';

let expenses: Expense[] = [];

export const mockDB = {
  getAll(): Expense[] {
    return expenses;
  },

  seed(data: Expense[]) {
    expenses = data;
  },

  add(expense: Expense) {
    expenses.unshift(expense);
  },

  update(expense: Expense) {
    expenses = expenses.map((e) => (e.id === expense.id ? expense : e));
  },

  remove(id: string) {
    expenses = expenses.filter((e) => e.id !== id);
  },
};

mockDB.seed(
  Array.from({ length: 25 }).map((_, i) => ({
    id: uuid(),
    title: `Expense ${i + 1}`,
    amount: Math.floor(Math.random() * 1000),
    date: new Date().toISOString(),
    category: ['Food', 'Travel', 'Shopping'][Math.floor(Math.random() * 3)] as Category,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }))
);
