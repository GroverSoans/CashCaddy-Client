import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const Signup = () => {
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
    <div className="form_container">
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            placeholder="Enter your first name"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">last name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            placeholder="Enter your last name"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
    </div>
  )
}

export default Signup