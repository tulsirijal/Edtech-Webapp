import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { resetPassword } from "../services/operations/authServices";
import {BsArrowLeft} from 'react-icons/bs'
export default function UpdatePassword() {
  const { loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  function handleChange(e) {
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
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(formData.password, formData.confirmPassword, token,navigate));
  }
  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }
  function handleShowConfirmPassword() {
    setShowConfirmPassword((prev) => !prev);
  }
  return (
    <div className="w-11/12 max-w-[500px] mx-auto flex justify-center items-center my-auto text-richblack-25">
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="flex flex-col gap-y-2">
          <h1 className="text-4xl font-semibold">Choose a new password</h1>
          <p className="text-richblack-100 text-[18px]">Almost done. Enter your new password</p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <label htmlFor="password" className="text-richblack-5 text-[14px]">New Password <sup className="text-pink-100">*</sup> </label>
            <div className="relative ">
              <input
                required
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full h-10 px-2 text-richblack-5 outline-none bg-richblack-800 rounded-md"
              />
              <span className="absolute right-2 top-3" onClick={handleShowPassword}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <label htmlFor="confirmPassword" className="text-richblack-5 text-[14px]">Confirm Password <sup className="text-pink-100">*</sup></label>
            <div className="relative">
              <input
                required
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full h-10 px-2 text-richblack-5 outline-none bg-richblack-800 rounded-md"
              />
              <span className="absolute right-2 top-3" onClick={handleShowConfirmPassword}>
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </span>
            </div>
            <button className="w-full my-2 bg-yellow-50 text-black  h-10 rounded-md " type="submit">Reset Password</button>
          </form>
          <div>
            <Link to="/login" className="flex gap-2 items-center">
              <BsArrowLeft/>
              <p>Back to login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
