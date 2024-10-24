import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Icons from react-icons
import axios from 'axios'

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {

    const [email ,setemail]=useState('');
    const [password,setpassword]=useState("");
    const [error,setError]=useState(null)
    const {login} = useAuth()
    const navigate=useNavigate()


  const handleSubmit=async(e)=>{
   e.preventDefault()

   try {
    const response=await axios.post("http://localhost:5000/api/auth/login",{email,password})

    if(response.data.success){
      login(response.data.user)
      localStorage.setItem("token",response.data.token)
      if(response.data.user.role==="admin"){
      navigate('/admin-dashboard')
      }
      else{
        navigate('/employee-dashboard')
      }
    }
   } catch (error) {
    if(error.response && error.response.data.success){
      setError(error.response.data.success)
    }
    else{
      setError("Server Error")
    }
    
   }

  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100 px-4 sm:px-0">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full sm:p-10">
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-green-700 mb-6">
          Employee Management System
        </h2>
        {error && <p className='text-red-500'>{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaEnvelope className="text-gray-400" />
              </span>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e)=>setemail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="text-gray-400" />
              </span>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e)=>setpassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;