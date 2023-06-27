import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authServices";
export default function LoginForm() {
    const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch()
  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }
  function handleFormData(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login(formData.email,formData.password,navigate))
    console.log(formData);
  }

  return (
    <div>
      <form
        className="flex flex-col gap-3 max-w-[450px]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-[5px]">
          <label
            htmlFor="email"
            className="font-semibold text-[14px] text-richblack-5"
          >
            Email Address <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={handleFormData}
            name="email"
            id="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-md bg-richblack-800 outline-none text-richblack-5"
          />
        </div>
        <div className="flex flex-col gap-[5px] ">
          <label
            htmlFor="password"
            className="font-semibold text-[14px] text-richblack-5"
          >
            Password <sup className="text-pink-200">*</sup>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleFormData}
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md bg-richblack-800 outline-none text-richblack-5"
            />
            <div
              onClick={handleShowPassword}
              className="absolute top-3 right-1 text-richblack-300"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>
        </div>
        <Link to='/forgotPassword'>
            <p className="text-[10px] text-blue-100 self-end -mt-2">
              Forgot Password
            </p>
        </Link>
        <button className="bg-yellow-50 py-2 px-4 rounded-md mt-5">
          Sign in
        </button>
      </form>
    </div>
  );
}
