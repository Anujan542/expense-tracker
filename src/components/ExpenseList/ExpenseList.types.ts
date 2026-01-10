import type { Expense } from "../../types/expenseTypes";

export interface ExpenseListProps {
  expenses: Expense[];
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}