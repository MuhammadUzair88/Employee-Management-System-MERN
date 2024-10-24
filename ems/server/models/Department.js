import mongoose from 'mongoose';

// Define the Department schema
const departmentSchema = new mongoose.Schema({
  dep_name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Create the Department model
const Department = mongoose.model('Department', departmentSchema);

// Export the Department model
export default Department;
