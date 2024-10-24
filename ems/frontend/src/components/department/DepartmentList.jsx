import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "./../../../utils/DepartmentHelper";
import { useEffect, useState } from "react";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState(null);
  const [filteredDepartments, setFilterDepartments] = useState([]);

  const ondepartmentDelete = async (id) => {
    const data = departments.filter((dep) => dep._id !== id);
    setDepartments(data);
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
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: (
              <DepartmentButtons
                _id={dep._id}
                ondepartmentDelete={ondepartmentDelete}
                department={dep}
              />
            ), // Pass department info if needed
          }));
          setDepartments(data);
          setFilterDepartments(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchDepartments();
  }, []); // Correct dependency array to prevent infinite loop

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterDepartments(records);
  };

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Departments</h3>
      </div>
      <div className="flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search By Department Name"
          className="px-4 py-0.5 border rounded"
          onChange={filterDepartments}
        />
        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Department
        </Link>
      </div>
      <div className="mt-5">
        <DataTable
          columns={columns}
          data={filteredDepartments || []}
          pagination
        />{" "}
        {/* Handle null data */}
      </div>
    </div>
  );
};

export default DepartmentList;
