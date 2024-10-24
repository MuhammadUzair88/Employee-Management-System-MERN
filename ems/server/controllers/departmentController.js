import Department from "../models/Department.js";



const getDepartments=async(req,res)=>{
    try{
        const departments=await Department.find()
        return res.status(200).json({success:true,departments})
    }
    catch(error){
        return res.status(500).json({success:false,error:"get department server Error"})
    }
}
const AddDepartment=async(req,res)=>{

    try {
        const {dep_name,description}=req.body;
        const newDep=new Department({
            dep_name,
            description
        })
        await newDep.save()
        return res.status(200).json({success:true,department:newDep})
    } catch (error) {
        return res.status(500).json({success:false,error:"add department server Error"})
    }
}

const EditDepartment=async(req,res)=>{
    try{
        const {id}=req.params;
        const department=await Department.findById({_id:id})
        return res.status(200).json({success:true,department})
    }
    catch(error){
        return res.status(500).json({success:false,error:"get department server Error"})
    }
}


const UpdateDepartment=async(req,res)=>{
    try{
        const {id}=req.params;
        const {dep_name,description}=req.body;
        const updateDep=await Department.findByIdAndUpdate({_id:id},{
            dep_name,
            description
        })
        return res.status(200).json({success:true,updateDep})
    }
    catch(error){
        return res.status(500).json({success:false,error:"edit department server Error"})
    }
}

const DeleteDepartment = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Delete request for ID:", id);  // Log the ID
  
      const updateDep = await Department.findByIdAndDelete(id);
  
      if (!updateDep) {
        return res.status(404).json({ success: false, error: "Department not found" });
      }
  
      return res.status(200).json({ success: true, updateDep });
    } catch (error) {
      console.error("Error deleting department:", error);  // Log the error
      return res.status(500).json({ success: false, error: "Server Error" });
    }
  };
  
  
export {AddDepartment,getDepartments,EditDepartment,UpdateDepartment,DeleteDepartment}