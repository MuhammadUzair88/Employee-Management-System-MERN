import Employee from "../models/Employee.js";
import Salary from "../models/Salary.js";



const addSalary = async (req, res) => {
    try {
        console.log("Request body:", req.body); // Add this line to log incoming data
        const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;

        // Process salary logic
        const totalSalary = parseFloat(basicSalary) + parseFloat(allowances) - parseFloat(deductions);

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        });
        
        await newSalary.save();
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error adding salary:", error); // Log the error to see specific issues
        return res.status(500).json({ success: false, error: "Salary add server Error" });
    }
};

const getSalary = async (req, res) => {
    try {
      const { id } = req.params;
      const salary = await Salary.find({ employeeId: id }).populate(
        'employeeId',
        'employeeId'
      );
      
      if (salary.length === 0) {
        return res.status(404).json({ success: false, message: 'No salary records found for this employee' });
      }
  
      return res.status(200).json({ success: true, salary });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Salary retrieval server error',
      });
    }
  };


  const getEmployeeSalary=async(req,res)=>{
    try {
      const { id } = req.params;

     const employeeid=await Employee.findOne({userId:id})

      const salary = await Salary.find({ employeeId: employeeid._id }).populate(
        'employeeId',
        'employeeId'
      );
      
      if (salary.length === 0) {
        return res.status(404).json({ success: false, message: 'No salary records found for this employee' });
      }
  
      return res.status(200).json({ success: true, salary });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Salary retrieval server error',
      });
    }
  }
  
  
  


export {addSalary,getSalary,getEmployeeSalary}