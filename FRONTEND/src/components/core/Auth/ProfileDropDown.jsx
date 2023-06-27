import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiFillDashboard } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../../../services/operations/authServices";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {VscSettingsGear,VscMortarBoard,VscHistory} from 'react-icons/vsc'
import {RxHamburgerMenu} from 'react-icons/rx'
export default function ProfileDropDown() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  if (!user) return null;
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  function handleOnClick() {
    dispatch(logout(navigate));
    console.log("logged out");
  }
  function handleShowDropdown() {
    setShowDropdown((prev) => !prev);
  }
  return (
    <div
      className="flex relative gap-1 z-[999] items-center"
      onClick={handleShowDropdown}
    >
      <img className="w-7 rounded-full" src={user?.image} />
      <IoMdArrowDropdown className="hidden md:block" />
      <RxHamburgerMenu className='md:hidden block mt-1 ml-1'/>
      <div
        className={`${
          showDropdown ? "block" : "hidden"
        } z-[999] absolute top-[120%] -left-10 border border-richblack-700 rounded-md bg-richblack-800 text-richblack-100`}
      >
        <div className="flex items-center gap-1 p-2 border-b-[1px] border-b-richblack-700 hover:bg-richblack-700 transition-all duration-200">
          <AiFillDashboard />
          <p onClick={() => navigate("/dashboard/my-profile")}>dashboard</p>
        </div>
       
        <div className="md:hidden flex items-center gap-1 p-2 border-b-[1px] border-b-richblack-700 hover:bg-richblack-700 transition-all duration-200">
          <VscMortarBoard/>
          <p onClick={() => navigate("/dashboard/enrolled-courses")}>
             Courses
          </p>
        </div>
        <div className="md:hidden flex items-center gap-1 p-2 border-b-[1px] border-b-richblack-700 hover:bg-richblack-700 transition-all duration-200">
          <VscHistory />
          <p onClick={() => navigate("/dashboard/purchase-history")}>Cart</p>
        </div>
        <div className="md:hidden flex items-center gap-1 p-2 border-b-[1px] border-b-richblack-700 hover:bg-richblack-700 transition-all duration-200">
          <VscSettingsGear />
          <p onClick={() => navigate("/dashboard/settings")}>Settings</p>
        </div>
        <div
          className="flex items-center p-2 gap-1  z-[999] hover:bg-richblack-700 transition-all duration-200 border-b-[1px] border-b-richblack-700"
          onClick={handleOnClick}
        >
          <MdOutlineLogout />
          <p className="">Logout</p>
        </div>
      </div>
    </div>
  );
}
