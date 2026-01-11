import { useDeleteExpense } from "../../hooks/useDeleteExpense";
import { ExpenseItem } from "../ExpenseItem/ExpenseItem";
import { Button } from "../ui/button";
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
      <ul>
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDelete={deleteExpense}
          />
        ))}
      </ul>

      {isLoading && <p>Loading...</p>}

      {hasMore && !isLoading && (
        <Button variant="outline" className="w-full" onClick={onLoadMore}>
          Load More
        </Button>
      )}
    </div>
  );
};
