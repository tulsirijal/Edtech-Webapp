import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiFillDashboard } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../../../services/operations/authServices";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { VscSettingsGear, VscDashboard } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLink from "../Dashboard/SidebarLink";
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
      <RxHamburgerMenu className="md:hidden block mt-1 ml-1" />
      <div
        className={`${
          showDropdown ? "block" : "hidden"
        } z-[999] absolute top-[120%] -left-10 border border-richblack-700 rounded-md bg-richblack-800 text-richblack-100`}
      >
        <div className="md:hidden">
          {sidebarLinks.map((link, index) => {
            if (link.type && user?.accountType !== link.type) return null;
            return <SidebarLink link={link} key={index} />;
          })}
        </div>
        <Link to="/dashboard/my-profile" className="hidden md:block">
          <p className="text-richblack-100 flex items-center gap-1 p-2 z-[999] border-b-[1px] border-b-richblack-700 hover:bg-richblack-700 transition-all duration-200">
            <VscDashboard />
            <span>Dashboard</span>
          </p>
        </Link>
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
