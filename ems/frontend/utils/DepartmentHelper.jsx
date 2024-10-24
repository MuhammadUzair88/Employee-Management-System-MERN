import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ _id, ondepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/department/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        // Remove the department from the list only on successful deletion
        ondepartmentDelete(id);
      } else {
        // Only show an alert if the deletion was unsuccessful
        alert(response.data.error);
      }
    } catch (error) {
      // Show an alert only if there's an error in the request
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex space-x-9">
      <div>
        <button
          className="px-3 py-1 bg-teal-600 text-white mr-3"
          onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
        >
          Edit
        </button>
      </div>
      <div>
        <button
          className="px-3 py-1 bg-red-600 text-white"
          onClick={() => handleDelete(_id)} // Ensure that the correct _id is passed here
        >
          Delete
        </button>
      </div>
    </div>
  );
};
