import React from "react";
import Sidebar from "../components/EmployeeDashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import { Outlet } from "react-router-dom";
import Summary from "../components/EmployeeDashboard/Summary";

const EmployeeDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Navbar */}
        <div className="bg-white shadow-md">
          <Navbar />
        </div>

        {/* Dashboard summary */}
        <div className="flex-1 pt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
