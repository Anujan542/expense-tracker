import { useDispatch, useSelector } from "react-redux";
import { setCategoryFilter } from "../../redux/expenses/expensesSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import type { RootState } from "@/redux/store";

const categories = ["All", "Food", "Travel", "Shopping"];

export const FilterExpense = () => {
  const dispatch = useDispatch();
  const categoryFilter = useSelector(
    (state: RootState) => state.expenses.categoryFilter
  );

  // const total = useSelector((state: RootState) => {
  //   const expenses = state.expenses.items;
  //   const filteredExpenses = categoryFilter
  //     ? expenses.filter((expense) => expense.category === categoryFilter)
  //     : expenses;
  //   return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  // });

  return (
    <>
      <Card>
        <CardContent className="flex flex-wrap gap-2">
          <Select
            value={categoryFilter ?? "All"}
            onValueChange={(value) =>
              dispatch(setCategoryFilter(value === "All" ? null : value))
            }
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((c) => (
                  <SelectItem value={c}>{c}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => dispatch(setCategoryFilter(null))}
          >
            Clear
          </Button>
          {/* <div className="flex items-center justify-center">
            <div className="text-2xl font-bold">Total: ${total.toFixed(2)}</div>
          </div> */}
        </CardContent>
      </Card>
    </>
  );
};
