import { useCreateExpense } from "../../hooks/useCreateExpense";
import { v4 as uuid } from "uuid";
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
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

interface ExpenseFormProps {
  openAddExpense: boolean;
  setOpenAddExpense: (open: boolean) => void;
}

export const ExpenseForm = ({
  openAddExpense,
  setOpenAddExpense,
}: ExpenseFormProps) => {
  const { mutate, isPending } = useCreateExpense();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [category, setCategory] = useState<Category>("Other");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState("");

  const categories = ["Food", "Travel", "Shopping"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const expense: Expense = {
      id: uuid(),
      title,
      amount: Number(amount),
      date: date?.toISOString() ?? new Date().toISOString(),
      category: category,
      notes: notes || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mutate(expense);
    setTitle("");
    setNotes("");
    setCategory("Other");
    setAmount(0);
    setOpenAddExpense(false);
  };

  return (
    <>
      <Dialog open={openAddExpense} onOpenChange={setOpenAddExpense}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
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
                <Button
                  className="w-full cursor-pointer"
                  disabled={isPending || title === "" || amount === 0}
                >
                  Add Expense
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
