import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import Admin Components
import CompanyManagement from "./components/admin/CompanyManagement";
import CommunicationMethods from "./components/admin/CommunicationMethods";

// Import User Components
import Dashboard from "./components/user/Dashboard";
import CalendarView from "./components/user/CalendarView";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Header with Navigation Links */}
        <header className="bg-blue-500 text-white p-4">
          <nav className="container mx-auto flex justify-between">
            <div>
              <Link to="/" className="text-lg font-bold hover:underline">
                Home
              </Link>
            </div>
            <div className="space-x-4">
              <Link to="/admin/companies" className="hover:underline">
                Companies
              </Link>
              <Link to="/admin/methods" className="hover:underline">
                Methods
              </Link>
              <Link to="/user/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link to="/user/calendar" className="hover:underline">
                Calendar
              </Link>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto py-8">
          <Routes>
            {/* Admin Module */}
            <Route path="/admin/companies" element={<CompanyManagement />} />
            <Route path="/admin/methods" element={<CommunicationMethods />} />

            {/* User Module */}
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route path="/user/calendar" element={<CalendarView />} />

            {/* Default Route */}
            <Route
              path="/"
              element={
                <div className="text-center text-gray-700">
                  <h1 className="text-3xl font-bold mb-4">
                    Welcome to the Calendar Application
                  </h1>
                  <p>
                    Select a module from the navigation bar above to get
                    started.
                  </p>
                </div>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-blue-500 text-white p-4 text-center">
          <p>Calendar Application © 2024</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
