import React from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../../../services/apiConnector";
import { userDetails } from "../../../../services/apis";
import { logout } from "../../../../services/operations/authServices";
export default function DeleteAccount() {
    const {token} = useSelector(state=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    async function handleDeleteAccount(){
        try {
             await apiConnector('DELETE',userDetails.DELETE_ACCOUNT,null,{
                Authorization:`Bearer ${token}`
            })
            
            toast.success('Deleted account successfully');
            dispatch(logout(navigate))
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong");
        }
    }
  return (
    <div className="flex gap-2 bg-pink-900 border-[1px] border-pink-700 px-4 py-2">
      <MdDelete className="text-white text-2xl md:text-4xl" />
      <div>
        <p className="font-bold text-richblack-5">Delete Account</p>
        <p className="text-pink-25">Would you like to delete your account ?</p>
        <p className="text-pink-25 max-w-[70%]">
          This accout may contain paid courses. Deleting your account is
          permanent and will remove content associated with this account.
        </p>
        <button onClick={handleDeleteAccount} className="italic text-pink-300 cursor-pointer my-2">I want to delete my account</button>
      </div>
    </div>
  );
}
