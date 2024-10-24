import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();

  // Initialize formData with default values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: "",
    password: "",
    role: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0] || null, // Set to null if no file selected
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employee/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data", // Set content type for file upload
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  return (
    <div className="h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold text-center pb-5">
          Add Employee
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name and Email */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Insert Name"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Insert Email"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Employee ID and Date of Birth */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Employee ID</label>
              <input
                type="text"
                name="employeeId"
                onChange={handleChange}
                placeholder="Employee ID"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Gender and Marital Status */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Gender</label>
              <select
                name="gender"
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Marital Status</label>
              <select
                name="maritalStatus"
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>
          </div>

          {/* Designation and Department */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Designation</label>
              <input
                type="text"
                name="designation"
                onChange={handleChange}
                placeholder="Designation"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Department</label>
              <select
                name="department"
                onChange={handleChange}
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
          </div>

          {/* Salary and Password */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Salary</label>
              <input
                type="text"
                name="salary"
                onChange={handleChange}
                placeholder="Salary"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Role and Upload Image */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Role</label>
              <select
                name="role"
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Upload Image</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
