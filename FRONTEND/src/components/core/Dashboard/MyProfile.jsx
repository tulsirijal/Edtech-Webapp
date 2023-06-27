import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import {LuEdit} from 'react-icons/lu'
export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <div className="h-[calc(100vh-3.5rem)]">
      <div className="flex flex-col gap-14 mt-[90px] ">
        <p className="text-richblack-5 text-4xl font-medium">My profile</p>
        <div className="flex bg-richblack-800 px-6 py-4 rounded-md border-[1px] border-richblack-700 items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              className=" h-[70px] w-[70px] rounded-full"
              src={user?.image}
            />
            <div>
              <p className="text-richblack-5 text-lg font-bold">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-richblack-300 text-sm font-medium">{user?.email}</p>
            </div>
          </div>
            <IconBtn
              text="Edit"
              onClick={() => {
                navigate("/dashboard/settings");
              }}
            >
              <LuEdit/>
            </IconBtn>
        </div>
        <div className="bg-richblack-800 border-[1px] border-richblack-700 px-6 py-4 rounded-md min-h-[150px] flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-richblack-5 font-semibold text-2xl">About</h2>
            <IconBtn
              text={"Edit"}
              onClick={() => navigate("/dashboard/settings")}
            >
              <LuEdit/>
            </IconBtn>
          </div>
          <div className="">
            {user?.additionalInfo.about ? (
             <span className="text-richblack-5">{ user.additionalInfo.about}</span>
            ) : (
              <div className="text-richblack-300">
                write something about yourself
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5 border-[1px] border-richblack-700 bg-richblack-800 px-6 py-4 rounded-md">
            <div className="text-richblack-5 flex items-center justify-between">
                <p className="font-semibold text-2xl">Personal Details</p>
                <IconBtn text={"Edit"} onClick={()=>navigate('/dashboard/settings')}>
                  <LuEdit/>
                </IconBtn>
            </div>
            <div className=" flex items-center justify-between text-richblack-5">
                <div>
                    <p className=" text-sm text-richblack-600">First Name</p>
                    <p>{user?.firstName}</p>
                </div>
                <div>
                    <p className="text-sm text-richblack-600">Last Name</p>
                    <p>{user?.lastName}</p>
                </div>
            </div>
            <div className=" flex items-center justify-between text-richblack-5">
                <div>
                    <p className="text-sm text-richblack-600">Email</p>
                    <p>{user?.email}</p>
                </div>
                <div>
                    <p className="text-sm text-richblack-600">Phone Number</p>
                    <p>{user?.additionalInfo.phoneNumber ? user.additionalInfo.phoneNumber: "Add contact number"}</p>
                </div>
            </div>
            <div className=" flex items-center justify-between text-richblack-5">
                <div>
                    <p className="text-sm text-richblack-600">Gender</p>
                    <p>{user?.additionalInfo.gender ? user.additionalInfo.gender : "Add your gender"}</p>
                </div>
                <div>
                    <p className="text-sm text-richblack-600">Date of birth</p>
                    <p>{user?.additionalInfo.DOB ? user.additionalInfo.DOB: "Add date of birth"}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
