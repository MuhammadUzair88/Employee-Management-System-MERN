import express from 'express';
import {AddDepartment,DeleteDepartment,EditDepartment,getDepartments, UpdateDepartment} from '../controllers/departmentController.js';
import verifyUser from '../middleware/authMiddleware.js';

const router =express.Router()

router.get('/',verifyUser,getDepartments)
router.post('/add',verifyUser,AddDepartment)
router.get('/:id',verifyUser,EditDepartment)
router.put('/:id',verifyUser,UpdateDepartment)
router.delete('/:id',verifyUser,DeleteDepartment)



export default router;