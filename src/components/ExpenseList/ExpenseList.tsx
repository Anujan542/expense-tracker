import { useDeleteExpense } from "../../hooks/useDeleteExpense";
import { ExpenseItem } from "../ExpenseItem/ExpenseItem";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
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

      {isLoading && (
        <div className="flex items-center justify-center">
          <Spinner className="size-6" />
        </div>
      )}

      {hasMore && !isLoading && (
        <div className="flex items-center justify-center">
          <Button
            variant="default"
            className="cursor-pointer"
            onClick={onLoadMore}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};
