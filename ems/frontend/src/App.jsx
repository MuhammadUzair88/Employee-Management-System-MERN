import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "../utils/PrivateRoutes";
import RoleBaseRoutes from "../utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import AddSalary from "./components/salary/AddSalary";
import ViewSalary from "./components/salary/ViewSalary";
import Summary from "./components/EmployeeDashboard/Summary";
import Profile from "./components/EmployeeDashboard/Profile";
import LeaveList from "./components/leave/List";
import LeaveAdd from "./components/leave/Add";
import EmployeeSalary from "./components/employeesalary/EmployeeSalary";
import Settings from "./components/EmployeeDashboard/Settings";
import Table from "./components/leave/Table";
import Detail from "./components/leave/Detail";
import DisplayEmployeeLeave from "./components/leave/DisplayEmployeeLeave";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect from the root path to the admin dashboard */}
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />

        {/* Route to the login page */}
        <Route path="/login" element={<Login />} />

        {/* Admin routes, protected by both authentication and role-based access */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* Default route to the admin summary */}
          <Route index element={<AdminSummary />} />

          {/* Nested routes within the admin dashboard */}
          <Route path="departments" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<EditDepartment />} />
          <Route path="/admin-dashboard/employees" element={<List />} />
          <Route path="/admin-dashboard/add-employee" element={<Add />} />
          <Route path="/admin-dashboard/employees/:id" element={<View />} />
          <Route path="/admin-dashboard/employee/edit/:id" element={<Edit />} />
          <Route path="/admin-dashboard/Salary" element={<AddSalary />} />
          <Route path="/admin-dashboard/leaves" element={<Table />} />
          <Route path="/admin-dashboard/leave/:id" element={<Detail />} />
          <Route
            path="/admin-dashboard/employees/salary/:id"
            element={<ViewSalary />}
          />
          <Route
            path="/admin-dashboard/employee/leave/:id"
            element={<DisplayEmployeeLeave />}
          />
        </Route>

        {/* Route for employee dashboard */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <EmployeeDashboard />
            </PrivateRoutes>
          }
        >
          {/* Nested routes inside employee dashboard */}
          <Route index element={<Summary />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="/employee-dashboard/leaves" element={<LeaveList />} />
          <Route path="/employee-dashboard/addleaves" element={<LeaveAdd />} />
          <Route
            path="/employee-dashboard/salary/:id"
            element={<EmployeeSalary />}
          />
          <Route path="/employee-dashboard/setting" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
