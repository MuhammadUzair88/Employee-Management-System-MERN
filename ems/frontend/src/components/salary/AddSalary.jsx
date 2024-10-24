import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../../utils/EmployeeHelper";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const AddSalary = () => {
  const [salaryDetails, setSalaryDetails] = useState({
    department: "",
    employee: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    payDate: "",
  });
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalaryDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  };

  const navigate = useNavigate(); // fix navigate function name

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending salaryDetails in the request body
      const response = await axios.post(
        `http://localhost:5000/api/salary/add`,
        salaryDetails, // Ensure that salaryDetails contains all necessary fields
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token exists in localStorage
            "Content-Type": "application/json", // JSON content type
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        navigate("/admin-dashboard/employees"); // Redirect to the employees page after successful addition
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        console.error("Error adding salary:", error); // Log the error in the frontend console for further debugging
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Salary</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Department</label>
            <select
              name="department"
              onChange={handleDepartment}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Employee</label>
            <select
              name="employeeId"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.employeeId}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="basicSalary" className="block text-gray-700 mb-2">
              Basic Salary
            </label>
            <input
              id="basicSalary"
              name="basicSalary"
              type="number"
              placeholder="Insert Salary"
              value={salaryDetails.basicSalary}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="allowances" className="block text-gray-700 mb-2">
              Allowances
            </label>
            <input
              id="allowances"
              name="allowances"
              type="number"
              placeholder="Monthly Allowances"
              value={salaryDetails.allowances}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="deductions" className="block text-gray-700 mb-2">
              Deductions
            </label>
            <input
              id="deductions"
              name="deductions"
              type="number"
              placeholder="Monthly Deductions"
              value={salaryDetails.deductions}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="payDate" className="block text-gray-700 mb-2">
              Pay Date
            </label>
            <input
              id="payDate"
              name="payDate"
              type="date"
              value={salaryDetails.payDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Salary
        </button>
      </form>
    </div>
  );
};

export default AddSalary;
