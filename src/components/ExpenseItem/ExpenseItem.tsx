import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "@/components/ui/button";
import type { Expense } from "../../types/expenseTypes";
import { Badge } from "../ui/badge";
import { ExpenseEditForm } from "../ExpenseForm/ExpenseEditForm";
import { format } from "date-fns";

interface Props {
  expense: Expense;
  onDelete: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  Food: "bg-green-100 text-green-800",
  Travel: "bg-blue-100 text-blue-800",
  Shopping: "bg-purple-100 text-purple-800",
  Other: "bg-gray-100 text-gray-800",
};

export const ExpenseItem = ({ expense, onDelete }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <ExpenseEditForm
        expense={expense}
        openEditExpense={isEditing}
        setOpenEditExpense={setIsEditing}
      />
    );
  }

  return (
    <>
      <div className="grid gap-4 mb-4">
        <Card className="hover:shadow-md transition p-4">
          <CardHeader
            className="
    flex flex-col gap-2
    items-center text-center
    sm:flex-row sm:items-center sm:justify-between sm:text-left
  "
          >
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
              <CardTitle className="text-base font-semibold wrap-break-word">
                {expense.title}
              </CardTitle>

              <Badge
                className={`${
                  categoryColors[expense.category]
                } px-2 py-1 rounded-md text-sm`}
              >
                {expense.category}
              </Badge>
            </div>

            <div className="text-lg font-bold mt-1 sm:mt-0">
              ${expense.amount}
            </div>
          </CardHeader>

          <CardContent
            className="
  flex flex-col
  items-center text-center
  sm:flex-row sm:items-center sm:justify-between sm:text-left
  gap-2 text-sm text-muted-foreground
"
          >
            <div className="wrap-break-word">
              <p>{expense.notes || ""}</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(expense.date), "MMM dd, yyyy")}
              </p>
            </div>

            <div className="flex flex-row gap-2 mt-2 sm:mt-0">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(expense.id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
