import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchExpenses } from "../services/expensesApi";
import { setExpenses } from "../redux/expenses/expensesSlice";

export const useInfiniteExpenses = () => {
  const dispatch = useDispatch();

  const query = useInfiniteQuery({
    queryKey: ["expenses"],
    queryFn: ({ pageParam = 1 }) => fetchExpenses(pageParam),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
    initialPageParam: 1,
  });

  useEffect(() => {
    if (query.data?.pages) {
      const allExpenses = query.data.pages.flatMap((page) => page.data);
      dispatch(setExpenses(allExpenses));
    }
  }, [query.data, dispatch]);

  return query;
};
