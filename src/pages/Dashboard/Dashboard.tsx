// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";
import { ExpenseForm } from "../../components/ExpenseForm/ExpenseForm";
import { ExpenseList } from "../../components/ExpenseList/ExpenseList";
import { FilterExpense } from "../../components/FilterExpense/FilterExpense";
import { useInfiniteExpenses } from "../../hooks/useInfiniteExpenses";
import { useOfflineSync } from "../../hooks/useOfflineSync";
import { selectFilteredExpenses } from "../../redux/expenses/expensesSelectors";
// import { selectTotalExpense } from "../../redux/expenses/expensesSelectors";
// import { useEffect } from "react";
// import { setExpenses } from "../../redux/expenses/expensesSlice";

const Dashboard = () => {
  useOfflineSync();

  // const dispatch = useDispatch();
  const expenses = useSelector(selectFilteredExpenses);

  const {
    // data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteExpenses();

  // useEffect(() => {
  //   if (data?.pages) {
  //     const allExpenses = data.pages.flatMap((p) => p.data);
  //     dispatch(setExpenses(allExpenses));
  //   }
  // }, [data, dispatch]);

  // const total = useSelector(selectTotalExpense);

  if (isLoading) {
    return <p>Loading expenses...</p>;
  }

  if (isError) {
    return <p>Error: {(error as Error).message}</p>;
  }

  // const expenses = data?.pages.flatMap((page) => page.data) || [];

  console.log("first",expenses)

  return (
    <>
      {/* <h2>Total Expense: ${total.toFixed(2)}</h2> */}
      <FilterExpense />
      <ExpenseForm />
      <ExpenseList
        expenses={expenses}
        hasMore={!!hasNextPage}
        isLoading={isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
      />
    </>
  );
};

export default Dashboard;
