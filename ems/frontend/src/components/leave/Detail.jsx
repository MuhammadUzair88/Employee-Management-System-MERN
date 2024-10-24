import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState({});

  useEffect(() => {
    const fetchLeavesDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setLeave(response.data.leaves);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchLeavesDetail();
  }, [id]);

  // Function to handle approval or rejection
  const handleStatusUpdate = async (status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/leave/update/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setLeave((prev) => ({ ...prev, status })); // Update the leave status in state
        alert(`Leave has been ${status.toLowerCase()}.`);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={`http://localhost:5000/${leave?.employeeId?.userId?.profileImage}`}
            alt="Employee"
            className="w-40 h-40 rounded-full object-cover"
          />
          <h2 className="text-2xl font-bold mt-4">Employee Details</h2>
        </div>
        <div className="mt-6">
          <p className="text-lg">
            <span className="font-semibold">Name:</span>{" "}
            {leave?.employeeId?.userId?.name || "Unknown"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Employee ID:</span>{" "}
            {leave?.employeeId?.employeeId || "N/A"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Gender:</span>{" "}
            {leave?.employeeId?.gender || "N/A"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Department:</span>{" "}
            {leave?.employeeId?.department.dep_name || "N/A"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Marital Status:</span>{" "}
            {leave?.employeeId?.maritalStatus || "N/A"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Leave Status:</span>{" "}
            {leave?.status || "N/A"}
          </p>

          {/* Show buttons if leave is pending */}
          {leave.status === "Pending" && (
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleStatusUpdate("Approved")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusUpdate("Rejected")}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
