import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { setCategoryFilter } from "../../redux/expenses/expensesSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const categories = ["All", "Food", "Travel", "Shopping"];

export const FilterExpense = () => {
  const dispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) => state.expenses.categoryFilter
  );

  return (
    <Select
      value={selected ?? "All"}
      onValueChange={(value) =>
        dispatch(setCategoryFilter(value === "All" ? null : value))
      }
    >
      <SelectTrigger className="">
        <SelectValue placeholder="Filter" />
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
  );
};
