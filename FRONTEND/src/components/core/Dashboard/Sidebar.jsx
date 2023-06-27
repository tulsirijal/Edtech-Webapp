import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authServices";
import SidebarLink from "./SidebarLink";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";
export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState(null);
  return (
    <div className=" hidden md:block  ">
      <div className=" min-w-[220px] h-[calc(100vh-3.5rem)] flex flex-col border-r-[1px] border-r-richblack-700  bg-richblack-800 py-10">
        <div className="flex flex-col ">
          {sidebarLinks.map((link, index) => {
            if (link.type && user?.accountType !== link.type) return null;
            return <SidebarLink key={link.id} link={link} />;
          })}
        </div>
        <div className="w-full h-[1px] my-6 bg-richblack-700"></div>
        <div className="flex flex-col">
          <SidebarLink
            link={{
              name: "Settings",
              path: "/dashboard/settings",
              icon: "VscSettingsGear",
            }}
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure ?",
                text2: "You will be logged out of your Account",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="text-sm font-medium"
          >
            <div className="flex gap-x-2 py-2 px-8 items-center">
              <span className="text-lg">
                <VscSignOut className="text-richblack-300" />
              </span>
              <span className="text-richblack-300">Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && (
        <div className="absolute top-[40%] left-[45%] border-[1px] py-4 px-4 border-richblack-700 backdrop-blur-sm">
          <ConfirmationModal modalData={confirmationModal} />
        </div>
      )}
    </div>
  );
}
