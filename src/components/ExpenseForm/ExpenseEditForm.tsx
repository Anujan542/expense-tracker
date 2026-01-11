
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Category, Expense } from "../../types/expenseTypes";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useUpdateExpense } from "../../hooks/useUpdateExpense";


interface ExpenseEditFormProps {
    expense: Expense;
    openEditExpense: boolean;
    setOpenEditExpense: (open: boolean) => void;
}

export const ExpenseEditForm = ({ expense, openEditExpense, setOpenEditExpense }: ExpenseEditFormProps) => {
  const { mutate: updateExpense,isPending } = useUpdateExpense();

  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState<Category>(expense.category);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState(expense.notes);

  const categories = ["All", "Food", "Travel", "Shopping"];

  const handleSave = () => {
    updateExpense({
      ...expense,
      title,
      amount,
      category,
      date: date?.toISOString() ?? new Date().toISOString(),
      notes,
      updatedAt: new Date().toISOString(),
    });
    setOpenEditExpense(false);
  };

  return (
    <>
      <Dialog open={openEditExpense} onOpenChange={setOpenEditExpense}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
          </DialogHeader>
            <div className="space-y-4">
              <Input
                required
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  required
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.valueAsNumber)}
                />
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "P") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value as Category)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    {categories.map((c) => (
                      <SelectItem value={c}>{c}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Notes (Optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  className="w-full cursor-pointer"
                  disabled={isPending || title === "" || amount === 0}
                  onClick={handleSave}
                >
                  Update Expense
                </Button>
              </div>
            </div>
          {/* </form> */}
        </DialogContent>
      </Dialog>
    </>
  );
};
