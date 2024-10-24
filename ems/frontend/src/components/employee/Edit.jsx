import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [departments, setDepartments] = useState([]);
  const [formDataObj, setFormDataObj] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataObj((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/employee/${id}`,
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        console.log(response.data.employee);
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "An error occurred");
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setDepartments(response.data.departments);
        }
      } catch (error) {
        setErrorMessage(
          error.response?.data?.error || "Failed to fetch departments"
        );
      }
    };

    const fetchEmployeeData = async () => {
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
          setFormDataObj(response.data.employee);
        }
      } catch (error) {
        setErrorMessage(
          error.response?.data?.error || "Failed to fetch employee data"
        );
      }
    };

    fetchDepartments();
    fetchEmployeeData();
  }, [id]);

  return (
    <div className="h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold text-center pb-5">
          Edit Employee
        </h2>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formDataObj.name}
                onChange={handleChange}
                placeholder="Insert Name"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700">Marital Status</label>
              <select
                name="maritalStatus"
                onChange={handleChange}
                value={formDataObj.maritalStatus}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Designation</label>
              <input
                type="text"
                name="designation"
                onChange={handleChange}
                value={formDataObj.designation}
                placeholder="Designation"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Department</label>
              <select
                name="department"
                onChange={handleChange}
                value={formDataObj.department}
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

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Salary</label>
              <input
                type="text"
                name="salary"
                onChange={handleChange}
                value={formDataObj.salary}
                placeholder="Salary"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
