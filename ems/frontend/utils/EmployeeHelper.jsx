import axios from "axios";
import { useNavigate } from "react-router-dom";
import Employee from "./../../server/models/Employee";

const column = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    sortable: true,
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:5000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(
      `http://localhost:5000/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};

const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2">
      <button
        className="px-3 py-1 bg-blue-600 text-white"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-green-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employee/edit/${_id}`)} // Add onClick handler
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-yellow-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employee-salary/${_id}`)} // Add onClick handler
      >
        Salary
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employee-leave/${_id}`)} // Add onClick handler
      >
        Leave
      </button>
    </div>
  );
};

export { fetchDepartments, getEmployees };
