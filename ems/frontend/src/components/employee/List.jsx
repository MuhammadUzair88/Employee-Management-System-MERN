import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate(); // Use navigate for buttons

  const EmployeeButtons = ({ _id }) => (
    <div className="flex gap-0.5">
      <button
        className="px-3 py-1 bg-blue-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-green-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employee/edit/${_id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-yellow-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}
      >
        Salary
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employee/leave/${_id}`)}
      >
        Leave
      </button>
    </div>
  );

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            employeeId: emp.employeeId,
            sno: sno++,
            name: emp.userId.name || "Unknown",
            profileImage: emp.userId.profileImage ? (
              <img
                width={50}
                src={`http://localhost:5000/${emp.userId.profileImage}`}
                className=" rounded-full"
                alt="Profile"
              />
            ) : (
              "No Image"
            ),
            dep_name: emp.department?.dep_name || "No Department",
            action: <EmployeeButtons _id={emp._id} />, // Render buttons for each employee
          }));

          setEmployees(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        } else {
          console.error("Error fetching employees:", error);
        }
      }
    };

    fetchEmployees();
  }, []);

  const columns = [
    {
      name: "S No",
      selector: (row) => row.sno,
    },

    {
      name: "Emp-ID",
      selector: (row) => row.employeeId,
    },

    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Image",
      selector: (row) => row.profileImage,
    },
    {
      name: "Department",
      selector: (row) => row.dep_name,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      width: "350px",
      center: true,
    },
  ];

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>
      <div className="flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search By Employee Name"
          className="px-4 py-0.5 border rounded"
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Employees
        </Link>
      </div>
      <div>
        <DataTable columns={columns} data={employees} />
      </div>
    </div>
  );
};

export default List;
