import { useSelector } from "react-redux";

import { ExpenseForm } from "../../components/ExpenseForm/ExpenseForm";
import { ExpenseList } from "../../components/ExpenseList/ExpenseList";
import { FilterExpense } from "../../components/FilterExpense/FilterExpense";
import { useInfiniteExpenses } from "../../hooks/useInfiniteExpenses";
import { useOfflineSync } from "../../hooks/useOfflineSync";
import { selectFilteredExpenses } from "../../redux/expenses/expensesSelectors";
import { Spinner } from "@/components/ui/spinner";

interface DashboardProps {
  openAddExpense: boolean;
  setOpenAddExpense: (open: boolean) => void;
}

const Dashboard = ({ openAddExpense, setOpenAddExpense }: DashboardProps) => {
  useOfflineSync();

  const expenses = useSelector(selectFilteredExpenses);

  const {
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteExpenses();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (isError) {
    return <p>Error: {(error as Error).message}</p>;
  }

  return (
    <>
      <FilterExpense />
      <ExpenseForm
        openAddExpense={openAddExpense}
        setOpenAddExpense={setOpenAddExpense}
      />
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
