import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const selectExpenses = (state: RootState) => state.expenses.items;

export const selectTotalExpense = createSelector([selectExpenses], (expenses) =>
  expenses.reduce((sum, e) => sum + e.amount, 0)
);

export const selectCategoryFilter = (state: RootState) =>
  state.expenses.categoryFilter;

export const selectFilteredExpenses = createSelector(
  [selectExpenses, selectCategoryFilter],
  (expenses, category) => {
    if (!category) return expenses;
    return expenses.filter((e) => e.category === category);
  }
);
