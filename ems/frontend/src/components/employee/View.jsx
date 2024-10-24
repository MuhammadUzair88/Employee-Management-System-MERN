import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={`http://localhost:5000/${employee?.userId?.profileImage}`}
            alt="Employee"
            className="w-40 h-40 rounded-full object-cover"
          />
          <h2 className="text-2xl font-bold mt-4">Employee Details</h2>
        </div>
        <div className="mt-6">
          <p className="text-lg">
            <span className="font-semibold">Name:</span>{" "}
            {employee?.userId?.name || "Unknown"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Employee ID:</span>{" "}
            {employee?.employeeId || "N/A"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Designation:</span>{" "}
            {employee?.designation || "N/A"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Gender:</span>{" "}
            {employee?.gender || "N/A"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Department:</span>{" "}
            {employee?.department?.dep_name || "N/A"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Marital Status:</span>{" "}
            {employee?.maritalStatus || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default View;
