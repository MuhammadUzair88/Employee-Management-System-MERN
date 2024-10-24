import express from 'express';
import verifyUser from '../middleware/authMiddleware.js';
import { addSalary, getEmployeeSalary, getSalary } from '../controllers/salaryController.js';


const router =express.Router()


router.post('/add',verifyUser,addSalary)
router.get('/:id',verifyUser,getSalary)
router.get('/employee/:id',verifyUser,getEmployeeSalary)








export default router;