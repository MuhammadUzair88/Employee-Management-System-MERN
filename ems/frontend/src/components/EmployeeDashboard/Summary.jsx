import React from "react";
import { FaBuilding } from "react-icons/fa";
import { useAuth } from "./../../context/AuthContext";

const Summary = () => {
  const { user } = useAuth();
  return (
    <div className="bg-slate-500 w-[50%] text-white p-4 rounded-lg shadow-md flex items-center">
      <div className="mr-4">
        <FaBuilding className="text-3xl" />
      </div>
      <div>
        <p>Welcome,</p>
        <h3 className="text-2xl font-semibold">{user.name}</h3>
      </div>
    </div>
  );
};

export default Summary;
