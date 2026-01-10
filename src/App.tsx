import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <>
       <section className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
                    <h2 className="text-4xl font-medium lg:text-5xl">Expense Tracker</h2>
                </div>

                <div className="">
                   <Dashboard />
                    {/* <div className="space-y-4">
                        <div className="text-5xl font-bold">+1200</div>
                        <p>Stars on GitHub</p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-5xl font-bold">22 Million</div>
                        <p>Active Users</p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-5xl font-bold">+500</div>
                        <p>Powered Apps</p>
                    </div> */}
                </div>
            </div>
        </section>
     
    </>
  );
}

export default App;
