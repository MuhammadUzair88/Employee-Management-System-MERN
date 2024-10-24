import {
  FaUsers,
  FaBuilding,
  FaDollarSign,
  FaFileAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";

const AdminSummary = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Dashboard Overview Section */}
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-teal-600 text-white p-4 rounded-lg shadow-md flex items-center">
          <div className="mr-4">
            <FaUsers className="text-3xl" />
          </div>
          <div>
            <p>Total Employees</p>
            <h3 className="text-2xl font-semibold">5</h3>
          </div>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md flex items-center">
          <div className="mr-4">
            <FaBuilding className="text-3xl" />
          </div>
          <div>
            <p>Total Departments</p>
            <h3 className="text-2xl font-semibold">3</h3>
          </div>
        </div>
        <div className="bg-red-600 text-white p-4 rounded-lg shadow-md flex items-center">
          <div className="mr-4">
            <FaDollarSign className="text-3xl" />
          </div>
          <div>
            <p>Monthly Pay</p>
            <h3 className="text-2xl font-semibold">$2500</h3>
          </div>
        </div>
      </div>

      {/* Leave Details Section */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Leave Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-teal-600 text-white p-4 rounded-lg shadow-md flex items-center">
          <div className="mr-4">
            <FaFileAlt className="text-3xl" />
          </div>
          <div>
            <p>Leave Applied</p>
            <h3 className="text-2xl font-semibold">2</h3>
          </div>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md flex items-center">
          <div className="mr-4">
            <FaCheckCircle className="text-3xl" />
          </div>
          <div>
            <p>Leave Approved</p>
            <h3 className="text-2xl font-semibold">2</h3>
          </div>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md flex items-center">
          <div className="mr-4">
            <FaHourglassHalf className="text-3xl" />
          </div>
          <div>
            <p>Leave Pending</p>
            <h3 className="text-2xl font-semibold">1</h3>
          </div>
        </div>
        <div className="bg-red-600 text-white p-4 rounded-lg shadow-md flex items-center">
          <div className="mr-4">
            <FaTimesCircle className="text-3xl" />
          </div>
          <div>
            <p>Leave Rejected</p>
            <h3 className="text-2xl font-semibold">2</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
