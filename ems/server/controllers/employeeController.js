import path from 'path';
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import multer from "multer";
import bcrypt from "bcryptjs"; 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dateOfBirth,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "User Already Registered" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? `/uploads/${req.file.filename}` : "" // Ensure the correct path is returned
        });

        const savedUser = await newUser.save();

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dateOfBirth,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        });

        await newEmployee.save();

        return res.status(200).json({ success: true, message: "Employee created" });
    } catch (error) {
        console.error("Error adding employee:", error);
        return res.status(500).json({ success: false, message: "Server Error While Adding Employee" });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('userId', { password: 0 }).populate('department');
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Error fetching employees" });
    }
};

const getEmployee = async (req, res) => {
    const { id } = req.params; // Extract the id from request parameters
    try {
        // Use let to allow reassignment
        let employee = await Employee.findById(id)
            .populate('userId', { password: 0 }) // Populate userId field, omitting the password
            .populate('department'); // Populate department field

        // If employee not found by id, search by userId
        if (!employee) {
          employee = await Employee.findOne({ userId: id })
            .populate("userId", { password: 0 })
            .populate("department");
        }

        // If still no employee found, return a 404 error
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        return res.status(200).json({ success: true, employee });
    } catch (error) {
        console.error("Error fetching employee:", error);
        return res.status(500).json({ success: false, error: "Error fetching employee" });
    }
};


const editEmployee = async (req, res) => {
    const { id } = req.params; // Get employee ID from request parameters
    try {
        const { name, maritalStatus, designation, department, salary } = req.body; // Destructure required fields

        // Find the employee by ID and populate the userId and department
        const employee = await Employee.findById(id).populate('userId').populate('department');
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        // Update user details
        const user = employee.userId; // Access the user document
        if (name) user.name = name; // Update user name if provided

        // Update employee details
        if (maritalStatus) employee.maritalStatus = maritalStatus;
        if (designation) employee.designation = designation;
        if (department) employee.department = department; // Assuming department is an object ID
        if (salary) employee.salary = salary;

        // Save both user and employee changes
        await user.save(); // Save user changes
        await employee.save(); // Save employee changes

        return res.status(200).json({ success: true, message: "Employee updated successfully", employee });
    } catch (error) {
        console.error("Error updating employee:", error);
        return res.status(500).json({ success: false, message: "Server Error While Updating Employee" });
    }
};


const fetchEmployeesByDeptId =async(req,res)=>{
    const { id } = req.params; // Extract the id from request parameters
    try {
        // Use the correct query: { _id: id }
        const employees = await Employee.find({department:id})
        // If employee not found
        if (!employees) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        return res.status(200).json({ success: true, employees });
    } catch (error) {
        console.error("Error fetching employee:", error);
        return res.status(500).json({ success: false, error: "Error fetching employee" });
    }
}



export { addEmployee, upload, getEmployees,getEmployee,editEmployee,fetchEmployeesByDeptId };
