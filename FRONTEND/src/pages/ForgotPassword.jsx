import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CTAbutton from "../components/core/homePage/CTAbutton";
import { Link } from "react-router-dom";
import { getResetPassswordToken } from "../services/operations/authServices";
import {BsArrowLeft} from 'react-icons/bs'
export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  function handleResetEmail(e){
    setEmail(e.target.value)
  }
  function handleOnSubmit(e){
    e.preventDefault();
    dispatch(getResetPassswordToken(email,setEmailSent));
  }
  return ( 
    <div className="text-richblack-25 mx-auto my-auto flex justify-center items-center h-[100%]">
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="flex flex-col gap-2 max-w-[350px]">
          <h1 className="text-3xl font-semibold">{!emailSent ? "Reset your password" : "Check your email"}</h1>
          <p className="text-richblack-100 text-[18px]">
            {!emailSent
              ? "Have no fear, we will help you reset your password.Type in your email below and we got you covered"
              : `We have sent a link to reset a password ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <div className="flex flex-col gap-y-1">
                <label htmlFor="email">Email <sup className="text-pink-100">*</sup> </label>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={handleResetEmail}
                  className="bg-richblack-800 h-10 px-2 rounded-md outline-none"
                />
              </div>
            )}
            <button className="w-full bg-yellow-50 text-black text-sm h-8 rounded-md my-3" type="submit">
                {
                    !emailSent ? "Submit" : "Resend email"
                }
            </button>
          </form>
          <div className="flex items-center gap-2">
          <BsArrowLeft/>
            <Link to='/login'>Back to login</Link>
          </div>
        </div>
      )}
    </div>
  );
}
