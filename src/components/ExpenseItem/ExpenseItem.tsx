import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "@/components/ui/button";
import type { Expense } from "../../types/expenseTypes";
import { Badge } from "../ui/badge";
import { ExpenseEditForm } from "../ExpenseForm/ExpenseEditForm";
import { format } from "date-fns";

interface Props {
  expense: Expense;
  onDelete: (id: string) => void;
}

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
      <div className="mb-4">
        <Card>
          <CardContent className="flex justify-between items-start p-1">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{expense.title}</h3>
                <Badge variant="secondary">{expense.category}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {format(new Date(expense.date), "MMM dd, yyyy")}
              </p>
              <p className="text-sm">
                {expense.notes ? expense.notes : "No notes"}
              </p>
            </div>
            <div className="text-left space-y-2">
              <p className="text-lg font-bold">${expense.amount}</p>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => onDelete(expense.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
