import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import EmployeeRouter from './routes/employee.js'
import SalaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'
import connectToDatabase from './db/db.js';
dotenv.config(); // This loads environment variables from .env file

connectToDatabase()
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use('/api/auth',authRouter)
app.use('/api/department',departmentRouter)
app.use('/api/employee',EmployeeRouter)
app.use('/api/salary',SalaryRouter)
app.use('/api/leave', leaveRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});
