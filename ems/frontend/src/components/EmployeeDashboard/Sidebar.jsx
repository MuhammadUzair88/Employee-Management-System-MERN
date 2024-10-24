import React from "react";
import { NavLink } from "react-router-dom";
import { FaBuilding, FaTachometerAlt, FaUser } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
  const { user } = useAuth();
  return (
    <div className="bg-gray-800 h-screen w-64 text-white">
      <div className="p-5">
        <h3 className="text-xl font-semibold text-center mb-5">Employee MS</h3>
      </div>
      <div className="space-y-4">
        {/* Dashboard Link */}
        <NavLink
          to="/employee-dashboard"
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
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
              isActive ? "bg-teal-500" : ""
            }`
          }
        >
          <FaUser className="mr-3" />
          <span>My Profile</span>
        </NavLink>

        {/* Department Link */}
        {/* Department Link */}
        <NavLink
          to="/employee-dashboard/leaves"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
              isActive ? "bg-teal-500" : ""
            }`
          }
        >
          <FaBuilding className="mr-3" />
          <span>Leaves</span>
        </NavLink>

        {/* Leave Link */}
        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
              isActive ? "bg-teal-500" : ""
            }`
          }
        >
          <FaBuilding className="mr-3" />
          <span>Salary</span>
        </NavLink>

        {/* Salary Link */}

        {/* Settings Link */}
        <NavLink
          to="/employee-dashboard/setting"
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
