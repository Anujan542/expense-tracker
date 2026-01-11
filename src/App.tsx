import { useState } from "react";

import { Button } from "./components/ui/button";

import Dashboard from "./pages/Dashboard/Dashboard";
import { Plus } from "lucide-react";

function App() {
  const [openAddExpense, setOpenAddExpense] = useState(false);
  return (
    <>
      <div className="min-h-screen bg-muted  p-6 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Expense Tracker</h1>
            <p className="text-muted-foreground">
              Track and manage your daily expenses
            </p>
          </div>
          <Button className="gap-2" onClick={() => setOpenAddExpense(true)}>
            <Plus size={16} /> Add Expense
          </Button>
        </div>
        <Dashboard
          openAddExpense={openAddExpense}
          setOpenAddExpense={setOpenAddExpense}
        />
      </div>
    </>
  );
}

export default App;
