import { useCreateExpense } from "../../hooks/useCreateExpense";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Category, Expense } from "../../types/expenseTypes";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

export const ExpenseForm = () => {
  const { mutate, isPending } = useCreateExpense();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState<Category>("Other");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState("");

  const categories = ["All", "Food", "Travel", "Shopping"];

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
  };

  return (
    <>
      <section className="">
        <form
          className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
          onSubmit={handleSubmit}
        >
          <div className="p-8 pb-6">
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstname" className="block text-sm">
                    Enter Title
                  </Label>
                  <Input
                    required
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname" className="block text-sm">
                    Enter Amount
                  </Label>
                  <Input
                    required
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.valueAsNumber)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="email" className="block text-sm">
                    Choose Category
                  </Label>
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
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Select Date</Label>

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
              </div>

              <div className="space-y-2">
                <Label htmlFor="pwd" className="text-sm">
                  Enter Notes
                </Label>
                <Textarea
                  placeholder="Notes (Optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <Button
                className="w-full cursor-pointer"
                disabled={isPending || title === "" || amount === 0}
              >
                Add Expense
              </Button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
