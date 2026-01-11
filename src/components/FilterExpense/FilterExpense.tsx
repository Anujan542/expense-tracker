import { useDispatch } from "react-redux";
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

const categories = ["All", "Food", "Travel", "Shopping"];

export const FilterExpense = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Card>
        <CardContent className="flex flex-wrap gap-4 py-4">
          <Select
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

          <Button variant="ghost">Clear</Button>
        </CardContent>
      </Card>
    </>
  );
};
