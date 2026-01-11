import { useState } from "react";

import { Card, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";

import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const [openAddExpense, setOpenAddExpense] = useState(false);
  return (
    <>
      <div className="min-h-screen bg-background p-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">💸 Expense Tracker</CardTitle>
              <p className="text-sm text-muted-foreground">
                Track your daily spending
              </p>
            </div>
            <Button onClick={() => setOpenAddExpense(true)}>
              + Add Expense
            </Button>
          </CardHeader>
        </Card>

        <Dashboard
          openAddExpense={openAddExpense}
          setOpenAddExpense={setOpenAddExpense}
        />
      </div>
    </>
  );
}

export default App;
