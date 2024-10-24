import React from "react";
import { useAuth } from "../context/AuthContext";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import AdminSummary from "../components/dashboard/AdminSummary";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar />

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

export default AdminDashboard;
