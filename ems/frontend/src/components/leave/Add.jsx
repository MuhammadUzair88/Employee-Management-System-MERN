import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Add = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Initialize state for leave form
  const [leave, setLeave] = useState({
    userId: user._id, // Automatically set the user's ID from context
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  // Universal handleChange function to update the form fields dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prev) => ({
      ...prev, // Spread the previous state
      [name]: value, // Dynamically set the field being changed
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/leave/add",
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data) {
        alert("Leave request submitted successfully!");
        navigate("/employee-dashboard/leaves");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || "An error occurred");
      } else {
        alert("An error occurred while submitting the request");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
      <form onSubmit={handleSubmit}>
        {/* Leave Type Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="leaveType"
            className="block text-sm font-medium text-gray-700"
          >
            Leave Type
          </label>
          <select
            id="leaveType"
            name="leaveType" // Use name to match state property
            value={leave.leaveType} // Access value from state
            onChange={handleChange} // Single change handler
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="" disabled>
              Select Leave Type
            </option>
            <option value="sick">Sick Leave</option>
            <option value="casual">Casual Leave</option>
            <option value="vacation">Vacation Leave</option>
          </select>
        </div>

        {/* From Date Input */}
        <div className="mb-4">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            From Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate" // Name matches state
            value={leave.startDate} // Access value from state
            onChange={handleChange} // Single change handler
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* To Date Input */}
        <div className="mb-4">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            To Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={leave.endDate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label
            htmlFor="reason"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="reason"
            name="reason"
            value={leave.reason}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Reason"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700"
          >
            Request Leave
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
