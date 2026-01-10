export type Category =
  | "Food"
  | "Travel"
  | "Shopping"
  | "Entertainment"
  | "Other";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: Category;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
