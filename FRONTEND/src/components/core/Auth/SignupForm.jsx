import React, { useState } from "react";
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "../../../services/operations/authServices";
import { setSignupData } from "../../../slices/authSlice";
export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const[showConfirmPassword,setShowConfirmPassword] = useState(false)
  const accountTypes = ["Student", "Teacher"];
  const [accountType, setAccountType] = useState(accountTypes[0]);
  const {firstName,lastName,email,password,confirmPassword} = formData;
  const signUpData = {
    ...formData,
    accountType
  }
  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }
  function handleShowConfirmPassword(){
    setShowConfirmPassword((prev)=>!prev)
  }
  function handleAccountType(value) {
    setAccountType(value);
  }
  function handleFormData(e){
    const {name,value} = e.target;
    setFormData((prev)=>{
        return {
            ...prev,
            [name]:value
        }
    })
  }
  async function handleSubmit(e){
    e.preventDefault()
    dispatch(setSignupData(signUpData));
    dispatch(sendOTP(email,navigate));
    console.log(signUpData);
  }
  return (
    <div className="">
      <div className="flex items-center gap-2 border py-2 px-3 bg-richblack-800 rounded-full w-fit mb-3">
        {accountTypes.map((acc, index) => {
          return (
            <p
              onClick={() => handleAccountType(acc)}
              key={index}
              className={` ${
                accountType === acc ? "bg-richblack-900 text-richblack-5 " : ""
              } transition-all duration-500 rounded-full py-2 px-4  font-medium text-[16px] text-richblack-100`}
            >
              {acc}
            </p>
          );
        })}
      </div>
      <form className="flex flex-col gap-3 max-w-[450px]" onSubmit={handleSubmit}>
        {/* names div */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="firstName"
              className="font-semibold text-[14px] text-richblack-5"
            >
              First name <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={handleFormData}
              id="firstName"
              name="firstName"
              className="px-4 py-2 rounded-md bg-richblack-800 outline-none text-richblack-5"
              placeholder="Enter your first name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="lastName"
              className="font-semibold text-[14px] text-richblack-5"
            >
              Last name <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              value={lastName}
              onChange={handleFormData}
              name="lastName"
              id="lastName"
              className="px-4 py-2 rounded-md bg-richblack-800 outline-none text-richblack-5"
              placeholder="Enter your last name"
            />
          </div>
        </div>
        {/* email div */}
        <div className="flex flex-col gap-[5px]">
          <label
            htmlFor="email"
            className="font-semibold text-[14px] text-richblack-5"
          >
            Email Address <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="email"
            value={email}
            onChange={handleFormData}
            name="email"
            id="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-md bg-richblack-800 outline-none text-richblack-5"
          />
        </div>
        {/* passwords div */}
        <div className="flex flex-col md:flex-row gap-2">
          {/* password div */}
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
                value={password}
                onChange={handleFormData}
                name="password"
                id="password"
                placeholder="Enter password"
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
          {/* confirm password div */}
          <div className="flex flex-col gap-[5px] ">
            <label
              htmlFor="confirmPassword"
              className="font-semibold text-[14px] text-richblack-5"
            >
              Confirm Password <sup className="text-pink-200">*</sup>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleFormData}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm password"
                className="w-full px-4 py-2 rounded-md bg-richblack-800 outline-none text-richblack-5"
              />
              <div
                onClick={handleShowConfirmPassword}
                className="absolute top-3 right-1 text-richblack-300"
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="bg-yellow-50 py-2 px-4 rounded-md mt-5">
          Create an account
        </button>
      </form>
    </div>
  );
}
