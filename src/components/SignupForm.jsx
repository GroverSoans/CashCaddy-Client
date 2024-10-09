import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignupForm = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
    })

    const { email, firstName, lastName, password } = inputValue;
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        })
    }

    const handleError = (err) =>
        toast.err(err, {
            position: "bottom-left"
        })
    const handleSuccess = (msg) =>
        toast.err(msg, {
            position: "bottom-right"
        })
    
        const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                const { data } = await axios.post(
                    "http://localhost:8000/signup",
                    {
                        ...inputValue
                    },
                    { withCredentials: true }
                );
                const { success, message } = data;
                if (success) {
                    handleSuccess(message);
                    setTimeout(() => {
                        navigate("/");

                    }, 1000)
                }else {
                    handleError(message)
                }
            }catch (error) {
                console.log(error)
            }
            setInputValue({
                ...inputValue,
                email: "",
                firstName: "",
                lastName: "",
                password: "",
            })

        }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">Signup Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              placeholder="Enter your first name"
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Enter your last name"
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
          <span className="block mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  )
}

export default SignupForm