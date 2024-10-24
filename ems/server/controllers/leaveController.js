

import Employee from '../models/Employee.js';
import Leave from '../models/Leave.js';

// Controller function to add leave using userId
export const addLeave = async (req, res) => {
  try {
    const { userId } = req.body;
    const { leaveType, startDate, endDate, reason } = req.body;

    // Step 1: Find the employee based on userId
    const employee = await Employee.findOne({ userId });
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Step 2: Create a new leave entry
    const newLeave = new Leave({
      employeeId: employee._id,   // Referencing employeeId
      leaveType,
      startDate,
      endDate,
      reason
    });

    // Save the leave entry to the database
    await newLeave.save();

    // Respond with success message
    res.status(201).json({ message: 'Leave added successfully', leave: newLeave });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getLeaves = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({ userId: id });

    const leaves = await Leave.find({ employeeId: employee._id });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: "Leave add server error" });
  }
};


  export const getLeavesForAdmin = async (req, res) => {

    try {
      const leaves = await Leave.find().populate({
        path: "employeeId",
        populate: [
          { path: "department", select: "dep_name" },
          { path: "userId", select: "name" },
        ]
      });
      console.log(leaves);
      return res.status(200).json({ success: true, leaves });
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .json({ success: false, message: "Server error in getting all leaves" });
    }
  };


  export const getLeaveDetail = async (req, res) => {
     
    try {

    const {id}=req.params;

      const leaves = await Leave.findById({_id:id}).populate({
        path: "employeeId",
        populate: [
          { path: "department", select: "dep_name" },
          { path: "userId", select: "name" },
          { path: "userId", select: "profileImage" },
        ]
      });
      console.log(leaves);
      return res.status(200).json({ success: true, leaves });
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .json({ success: false, message: "Server error in getting all leaves" });
    }
  };


export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // status will be "Approved" or "Rejected"

    // Check if the status is valid
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ success: false, error: "Invalid status" });
    }

    // Find the leave by ID
    const leave = await Leave.findById(id);
    if (!leave) {
      return res.status(404).json({ success: false, error: "Leave not found" });
    }

    // Check if the leave is already approved or rejected
    if (leave.status !== "Pending") {
      return res
        .status(400)
        .json({ success: false, error: "Leave is already processed" });
    }

    // Update the leave status
    leave.status = status;
    leave.updatedAt = Date.now();
    await leave.save();

    res.json({
      success: true,
      message: `Leave has been ${status.toLowerCase()}`,
      leave,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};


 export const deleteLeave=async(req,res)=>{
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndDelete(id);

    if (!leave) {
      return res.status(404).json({ success: false, error: "Leave not found" });
    }

    res.status(200).json({ success: true, message: "Leave deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
}

export const DisplaySingleEmployee=async(req,res)=>{
  try {
    const { id } = req.params;
  
    const leaves = await Leave.find({ employeeId: id });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: "Leave add server error" });
  }
}

  