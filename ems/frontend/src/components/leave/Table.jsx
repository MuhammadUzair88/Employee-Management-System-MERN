import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate();

  const handleDelete = async (leaveId) => {
    if (window.confirm("Are you sure you want to delete this leave?")) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/leave/delete/${leaveId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setLeaves((prevLeaves) =>
            prevLeaves.filter((leave) => leave.id !== leaveId)
          );
          setFilteredLeaves((prevLeaves) =>
            prevLeaves.filter((leave) => leave.id !== leaveId)
          );
          alert("Leave deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting leave:", error);
        alert("Failed to delete leave");
      }
    }
  };

  const LeaveButtons = ({ _id }) => (
    <div className="flex gap-0.5">
      <button
        className="px-3 py-1 bg-blue-600 text-white"
        onClick={() => navigate(`/admin-dashboard/leave/${_id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white"
        onClick={() => handleDelete(_id)} // Pass the leave ID to handleDelete
      >
        Delete
      </button>
    </div>
  );

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/leave", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.leaves.map((leave) => {
            const employee = leave.employeeId || {};
            const userId = employee.userId || {};
            const department = employee.department || {};

            return {
              id: leave._id,
              sno: sno++,
              employeeId: employee.employeeId || "N/A",
              name: userId.name || "Unknown",
              leaveType: leave.leaveType || "N/A",
              department: department.dep_name || "Unknown",
              days:
                new Date(leave.endDate).getDate() -
                new Date(leave.startDate).getDate(),
              status: leave.status || "Pending",
              action: <LeaveButtons _id={leave._id} />,
            };
          });

          setLeaves(data);
          setFilteredLeaves(data);
        }
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };

    fetchLeaves();
  }, []);

  const handleFilter = (status) => {
    setFilterStatus(status);
    if (status === "") {
      setFilteredLeaves(leaves);
    } else {
      const filtered = leaves.filter((leave) => leave.status === status);
      setFilteredLeaves(filtered);
    }
  };

  const columns = [
    { name: "S No", selector: (row) => row.sno },
    { name: "Emp-ID", selector: (row) => row.employeeId },
    { name: "Name", selector: (row) => row.name },
    { name: "Leave Type", selector: (row) => row.leaveType },
    { name: "Department", selector: (row) => row.department, width: "170px" },
    { name: "Days", selector: (row) => row.days, width: "80px" },
    { name: "Status", selector: (row) => row.status, width: "120px" },
    {
      name: "Action",
      cell: (row) => <div style={{ textAlign: "center" }}>{row.action}</div>,
      width: "350px",
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
        <div className="flex space-x-2">
          <button
            className={`${
              filterStatus === "Pending" ? "bg-teal-700" : "bg-teal-500"
            } text-white px-4 py-2 rounded-md`}
            onClick={() => handleFilter("Pending")}
          >
            Pending
          </button>
          <button
            className={`${
              filterStatus === "Approved" ? "bg-teal-700" : "bg-teal-500"
            } text-white px-4 py-2 rounded-md`}
            onClick={() => handleFilter("Approved")}
          >
            Approved
          </button>
          <button
            className={`${
              filterStatus === "Rejected" ? "bg-teal-700" : "bg-teal-500"
            } text-white px-4 py-2 rounded-md`}
            onClick={() => handleFilter("Rejected")}
          >
            Rejected
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={() => handleFilter("")}
          >
            All
          </button>
        </div>
      </div>
      <div>
        <DataTable columns={columns} data={filteredLeaves} pagination />
      </div>
    </div>
  );
};

export default Table;
