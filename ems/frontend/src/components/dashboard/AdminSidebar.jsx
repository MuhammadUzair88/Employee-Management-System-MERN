import React from "react";
import { NavLink } from "react-router-dom";
import { FaBuilding, FaTachometerAlt, FaUser } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 h-screen w-64 text-white">
      <div className="p-5">
        <h3 className="text-xl font-semibold text-center mb-5">Employee MS</h3>
      </div>
      <div className="space-y-4">
        {/* Dashboard Link */}
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
              isActive ? "bg-teal-500" : ""
            }`
          }
          end
        >
          <FaTachometerAlt className="mr-3" />
          <span>Dashboard</span>
        </NavLink>

        {/* Employee Link */}
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
              isActive ? "bg-teal-500" : ""
            }`
          }
        >
          <FaUser className="mr-3" />
          <span>Employee</span>
        </NavLink>

        {/* Department Link */}
        {/* Department Link */}
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
              isActive ? "bg-teal-500" : ""
            }`
          }
        >
          <FaBuilding className="mr-3" />
          <span>Department</span>
        </NavLink>

        {/* Leave Link */}
        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
              isActive ? "bg-teal-500" : ""
            }`
          }
        >
          <FaBuilding className="mr-3" />
          <span>Leave</span>
        </NavLink>

        {/* Salary Link */}
        <NavLink
          to="/admin-dashboard/Salary"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
              isActive ? "bg-teal-500" : ""
            }`
          }
        >
          <FaBuilding className="mr-3" />
          <span>Salary</span>
        </NavLink>

        {/* Settings Link */}
        <NavLink
          to="/admin-settings"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
              isActive ? "bg-teal-500" : ""
            }`
          }
        >
          <FaBuilding className="mr-3" />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
