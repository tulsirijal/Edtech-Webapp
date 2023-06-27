import { formToJSON } from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { apiConnector } from "../../../../services/apiConnector";
import { userDetails } from "../../../../services/apis";
import IconBtn from "../../../common/IconBtn";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function ProfileInfo() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
    
  async function submitFormData(data){
    try {
        const response = await apiConnector(
          "PUT",
          userDetails.UPDATE_ADDITIONAL_INFO,
          data,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        toast.success("Successfully updated")
        console.log(response);
       
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
      }
    }
  
  return (
    <div>
      <form onSubmit={handleSubmit(submitFormData)}>
          <div className="border-[1px] border-richblack-700 px-4 py-4">
            <p className="font-semibold text-richblack-5">Profile Information</p>
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <div className="flex flex-col gap-y-2 w-full">
                  <label
                    className="text-richblack-5 font-medium"
                    htmlFor="firstname"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.firstName}
                    name="firstName"
                    placeholder="First Name"
                    id="firstname"
                    className="bg-richblack-700 outline-none p-2 md:py-4 rounded-md text-richblack-5"
                    {...register("firstName")}
                  />
                </div>
                <div className="flex flex-col gap-y-2 w-full">
                  <label
                    className="text-richblack-5 font-medium"
                    htmlFor="lastname"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.lastName}
                    name="lastName"
                    placeholder="Last Name"
                    id="lastname"
                    className="bg-richblack-700 outline-none p-2 md:py-4 rounded-md text-richblack-5"
                    {...register("lastname")}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <div className="flex flex-col gap-y-2 w-full">
                  <label className="text-richblack-5 font-medium" htmlFor="date">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="DOB"
                    id="date"
                    defaultValue={user?.additionalInfo.DOB}
                    className="bg-richblack-700 outline-none p-2 md:py-4 rounded-md text-richblack-5"
                    {...register("DOB")}
                  />
                </div>
                <div className="flex flex-col gap-y-2 w-full">
                  <label className="text-richblack-5 font-medium" htmlFor="gender">
                    Gender
                  </label>
                  <select
                    className="bg-richblack-700 outline-none p-2 md:py-4 rounded-md text-richblack-5"
                    id="gender"
                    defaultValue={user?.additionalInfo.gender}
                    name="gender"
                    {...register("gender", { required: true })}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <div className="flex flex-col gap-y-2 w-full">
                  <label className="text-richblack-5 font-medium" htmlFor="contact">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.additionalInfo.phoneNumber}
                    placeholder="Contact Number"
                    name="phoneNumber"
                    id="contact"
                    className="bg-richblack-700 outline-none p-2 md:py-4 rounded-md text-richblack-5"
                    {...register("phoneNumber", { required: true })}
                  />
                   {
                    errors.phoneNumber && <span className="text-yellow-500 text-[10px]">Please enter the phone number</span>
                  }  
                </div>
                <div className="flex flex-col gap-y-2 w-full">
                  <label className="text-richblack-5 font-medium" htmlFor="about">
                    About
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.additionalInfo.about}
                    name="about"
                    placeholder="About Yourself"
                    id="about"
                    className="bg-richblack-700 outline-none p-2 md:py-4 rounded-md text-richblack-5"
                    {...register("about", { required: true })}
                  />
                 {
                    errors.about && <span className="text-yellow-500 text-[10px]">Please fill the about section</span>
                  }  
                </div>
                
              </div>
          </div>
          <div className="flex items-center gap-2 mt-5">
            <IconBtn text="save" type='submit'></IconBtn>
            <button type="button" onClick={()=>navigate('/dashboard/my-profile')} className="border border-richblack-800 rounded-md px-3 py-2 bg-richblack-700 text-richblack-300 ">
              Cancel
            </button>
          </div>
      </form>
    </div>
  );
}
