import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { sendOTP, signup } from "../services/operations/authServices";
import {BsArrowLeft} from 'react-icons/bs'
export default function VerifyEmail() {
  const { signupData, loading } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (signupData == null) {
      navigate("/signup");
    }
  }, []);
  function handleOnSubmit(e) {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
    } = signupData;
    dispatch(
      signup(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        otp,
        navigate
      )
    );
  }

  return (
    <div className="my-auto flex  justify-center items-center ">
      <div className="flex flex-col items-center justify-center w-[350px] lg:w-[300px] ">
        {loading ? (
          <div>loading...</div>
        ) : (
          <div className="flex flex-col items-start justify-center text-richblack-25">
            <h1 className="text-3xl font-semibold">Verify Email</h1>
            <p className="w-[80%] text-richblack-100 my-2">
              A verification code has been sent to you. Enter the code below
            </p>
            <form className="w-full" onSubmit={handleOnSubmit}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                  />
                )}
              />
              {/* <input type='text'  value={otp} onChange={handleChange}/> */}
              <button
                type="submit"
                className=" w-full text-center text-[16px] py-2 px-4 md:py-3 md:px-8 self-center rounded-md hover:scale-95 
                transition-all duration-200 bg-yellow-50  text-black my-2" 
              >
                Verify and Register
              </button>
            </form>
            <div className="flex justify-between items-center w-full">
              <Link to="/login">
                <div className="flex items-center gap-1">
                <BsArrowLeft/>
                    <p>Back to login</p>
                </div>
              </Link>
              <button className="text-blue-100" onClick={() => dispatch(sendOTP(email, navigate))}>
                Resend it
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
