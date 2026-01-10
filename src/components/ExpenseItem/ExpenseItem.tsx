// src/components/ExpenseItem/ExpenseItem.tsx
import { useState } from 'react';
import type { Expense } from '../../types/expenseTypes';
import { useUpdateExpense } from '../../hooks/useUpdateExpense';

interface Props {
  expense: Expense;
  onDelete: (id: string) => void;
}

export const ExpenseItem = ({ expense, onDelete }: Props) => {
  const { mutate: updateExpense } = useUpdateExpense();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);

  const handleSave = () => {
    updateExpense({
      ...expense,
      title,
      amount,
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </li>
    );
  }

  return (
    <li>
      <strong>{expense.title}</strong> — ${expense.amount}
      <button onClick={() => setIsEditing(true)}>
        Edit
      </button>
      <button onClick={() => onDelete(expense.id)}>
        Delete
      </button>
    </li>
  );
};
