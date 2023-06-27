import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { apiConnector } from "../../../../services/apiConnector";
import { authEndPoints } from "../../../../services/apis";
import IconBtn from "../../../common/IconBtn";
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
export default function UpdatePassword() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  async function submitPasswordUpdate(data) {
    try {
      const response = await apiConnector(
        "POST",
        authEndPoints.UPDATE_PASSWORD,
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(response);
      toast.success("Successfully updated")
    } catch (error) {
      console.log(error.data.message);
    }
  }
  function handleShowConfirmPassword() {
    setShowConfirmPassword((prev) => !prev);
  }
  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }
  return (
    <form onSubmit={handleSubmit(submitPasswordUpdate)}>
      <div>
        <p className="text-richblack-5 font-bold">Password</p>
        <div className="flex flex-col md:flex-row w-full gap-5">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-richblack-5 text-[14px]" htmlFor="oldPassword">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="current password"
                className="bg-richblack-800 text-richblack-5 p-2 rounded-md outline-none w-full"
                id="oldPassword"
                name="oldPassword"
                {...register("oldPassword", { required: true })}
              />
              <span className="absolute text-richblack-300 top-3 right-2">
                {showPassword ? (
                  <span onClick={handleShowPassword}>
                    <AiOutlineEyeInvisible />
                  </span>
                ) : (
                  <span onClick={handleShowPassword}>
                    <AiOutlineEye />
                  </span>
                )}
              </span>
              {
                errors.oldPassword && <span className="text-yellow-500 text-[10px]">Please enter old password</span>
              }
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-richblack-5 text-[14px]" htmlFor="newPassword">
              New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="new password"
                className="bg-richblack-800 text-richblack-5  p-2 rounded-md outline-none w-full"
                id="newPassword"
                name="newPassword"
                {...register("newPassword", { required: true })}
              />
              <span className="absolute text-richblack-300 top-3 right-2">
                {showPassword ? (
                  <span onClick={handleShowConfirmPassword}>
                    <AiOutlineEyeInvisible />
                  </span>
                ) : (
                  <span onClick={handleShowConfirmPassword}>
                    <AiOutlineEye />
                  </span>
                )}
              </span>
              {
                errors.newPassword && <span className="text-yellow-500 text-[10px]">Please enter new password</span>
              }
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-5">
            <IconBtn text="Update" type='submit'></IconBtn>
            <button type="button" onClick={()=>navigate('/dashboard/my-profile')} className="border border-richblack-800 rounded-md px-3 py-2 bg-richblack-700 text-richblack-300 ">
              Cancel
            </button>
          </div>
      </div>
    </form>
  );
}
