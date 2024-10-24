import React from "react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth(); // Assuming `logout` function is provided in the AuthContext

  const handleLogout = () => {
    logout(); // Call the logout function when the button is clicked
  };

  return (
    <nav className="bg-teal-600 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo or Title */}
        <div className="text-white text-2xl font-bold">Dashboard</div>

        {/* User Greeting and Logout Button */}
        <div className="flex items-center space-x-6">
          <p className="text-white text-lg">Welcome, {user?.name || "Guest"}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
