import express from 'express';
import verifyUser from '../middleware/authMiddleware.js';
import { addEmployee, editEmployee, fetchEmployeesByDeptId, getEmployee, getEmployees, upload } from '../controllers/employeeController.js';

const router =express.Router()


router.post('/add',verifyUser,upload.single('image'),addEmployee)
router.get('/',verifyUser,getEmployees)
router.get('/:id',verifyUser,getEmployee)
router.put('/:id',verifyUser,editEmployee)
router.get('/department/:id',verifyUser,fetchEmployeesByDeptId)





export default router;