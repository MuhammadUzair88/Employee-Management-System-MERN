﻿# Employee-Management-System-MERN
Employee Management System
Overview
The Employee Management System is a full-stack web application designed to streamline employee, department, and leave management. Built using the MERN stack (MongoDB, Express.js, React, Node.js), it provides a comprehensive interface for Admins to manage employee profiles, assign departments, handle leave requests, and allocate salaries. Employees can easily apply for leaves, view their leave status, and check their allocated salary, making the system efficient for both administrators and employees.

Features
Admin Features:
Employee Management: Admins can add, edit, and delete employee profiles. This includes personal information, department assignment, and salary details.
Leave Management: Admins can approve or reject employee leave requests, view all requests, and keep track of leave statuses.
Department Management: Admins can create departments and assign employees to their respective departments.
Salary Allocation: Admins can set and update employee salaries, which are visible to employees.
Admin Role Management: Admins can create additional admin accounts to help manage the system.
Employee Features:
Leave Application: Employees can apply for leaves and view the status of their requests (approved/rejected).
Profile Management: Employees can view their own profile, which includes personal details, department, and salary information.
Leave History: Employees can view a history of their leave requests, including dates and approval status.
Tech Stack
Frontend:
React.js: A modern JavaScript library used to create the interactive user interface.
TailwindCSS: Used for responsive and mobile-first design to ensure the application works well across all device types.
Backend:
Node.js: A JavaScript runtime for server-side development.
Express.js: A minimal and flexible Node.js web application framework for building APIs and handling server-side logic.
Database:
MongoDB: A NoSQL database used for storing employee details, leave requests, departments, and admin data.
State Management:
React Context API: Used for managing the state of the application across various components without prop drilling.
