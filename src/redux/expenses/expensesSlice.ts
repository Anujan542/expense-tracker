import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Expense } from "./../../types/expenseTypes";

interface ExpensesState {
  items: Expense[];
  categoryFilter: string | null;
}

const initialState: ExpensesState = {
  items: [],
  categoryFilter: null,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses(state, action: PayloadAction<Expense[]>) {
      state.items = action.payload;
    },
    addExpense(state, action: PayloadAction<Expense>) {
      state.items.unshift(action.payload);
    },
    updateExpense(state, action: PayloadAction<Expense>) {
      const index = state.items.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteExpense(state, action: PayloadAction<string>) {
      state.items = state.items.filter((e) => e.id !== action.payload);
    },
    setCategoryFilter(state, action: PayloadAction<string | null>) {
      state.categoryFilter = action.payload;
    },
  },
});

export const { setExpenses, addExpense, updateExpense, deleteExpense, setCategoryFilter } =
  expensesSlice.actions;

export default expensesSlice.reducer;
