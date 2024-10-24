import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom

const EmployeeSalary = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams(); // Assuming you're using React Router

  let sno = 1;

  // Fetching salary data based on department/employee ID
  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/salary/employee/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);

      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary); // Initialize the filteredSalaries state with fetched data
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  // Filtering salaries based on employee ID
  const filterSalaries = (e) => {
    const query = e.target.value;
    const filteredRecords = salaries.filter((salary) =>
      salary.employeeId.employeeId.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredSalaries(filteredRecords);
  };

  return filteredSalaries === null ? (
    <div>Loading...</div>
  ) : (
    <div className="overflow-x-auto p-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Salary History</h2>
      </div>

      <div className="flex justify-end my-3">
        <input
          type="text"
          placeholder="Search By Emp ID"
          className="border px-2 rounded-md py-0.5 border-gray-300"
          onChange={filterSalaries} // Updated to call the filter function
        />
      </div>

      {filteredSalaries.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-500">
          <thead>
            <tr className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
              <th className="px-6 py-3">SNO</th>
              <th className="px-6 py-3">Emp ID</th>
              <th className="px-6 py-3">Salary</th>
              <th className="px-6 py-3">Allowance</th>
              <th className="px-6 py-3">Deduction</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Pay Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredSalaries.map((salary) => (
              <tr
                key={salary._id} // Use _id or a unique identifier for the key
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-3">{sno++}</td>
                <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
                <td className="px-6 py-3">{salary.basicSalary}</td>
                <td className="px-6 py-3">{salary.allowances}</td>
                <td className="px-6 py-3">{salary.deductions}</td>
                <td className="px-6 py-3">{salary.netSalary}</td>
                <td className="px-6 py-3">
                  {new Date(salary.payDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center mt-4">No records found.</div>
      )}
    </div>
  );
};

export default EmployeeSalary;
