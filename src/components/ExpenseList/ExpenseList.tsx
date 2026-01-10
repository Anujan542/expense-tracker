import { useDeleteExpense } from "../../hooks/useDeleteExpense";
import { ExpenseItem } from "../ExpenseItem/ExpenseItem";
import type { ExpenseListProps } from "./ExpenseList.types";

export const ExpenseList = ({
  expenses,
  onLoadMore,
  hasMore,
  isLoading,
}: ExpenseListProps) => {
  const { mutate: deleteExpense } = useDeleteExpense();

  return (
    <div>
      {/* <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <strong>{expense.title}</strong> — ${expense.amount}
            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul> */}
       <ul>
        {expenses.map(expense => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDelete={deleteExpense}
          />
        ))}
      </ul>

      {isLoading && <p>Loading...</p>}

      {hasMore && !isLoading && <button onClick={onLoadMore}>Load More</button>}
    </div>
  );
};
