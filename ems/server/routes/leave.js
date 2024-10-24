import express from 'express';
import verifyUser from '../middleware/authMiddleware.js';
import { addLeave, deleteLeave, DisplaySingleEmployee, getLeaveDetail, getLeaves, getLeavesForAdmin, updateLeaveStatus } from '../controllers/leaveController.js';



const router =express.Router()


router.post('/add',verifyUser,addLeave)
router.get('/:id',getLeaves)
router.get('/',getLeavesForAdmin)
router.get('/detail/:id',getLeaveDetail)
router.put('/update/:id',updateLeaveStatus)
router.delete('/delete/:id',deleteLeave)
router.get('/employee/:id',DisplaySingleEmployee)








export default router;