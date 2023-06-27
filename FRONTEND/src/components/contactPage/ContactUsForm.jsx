import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiConnector";
import { contactUs } from "../../services/apis";
import CountryCode from "../../data/countrycode.json";
export default function ContactUsForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);
  async function submitForm(data) {
    console.log(data);
    try {
      setLoading(true);
      // const response = await apiConnector("POST",contactUs.CONTACT_US,data);
      const response = { status: "ok" };
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-2">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="firstname" className="text-richblack-5">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            {...register("firstname", { required: true })}
            className="px-4 py-2 bg-richblack-700 rounded-md outline-none text-richblack-5"
          />
          {errors.firstname && (
            <span className="text-yellow-100 text-[10px] -mt-1">
              Please enter your first name
            </span>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="lastname" className="text-richblack-5">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Enter last name"
            {...register("lastname")}
            className="px-4 py-2 bg-richblack-700 rounded-md outline-none text-richblack-5"
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="email" className="text-richblack-5">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className="px-4 py-2 bg-richblack-700 rounded-md outline-none text-richblack-5"
        />
        {errors.email && (
          <span className="text-yellow-100 text-[10px] -mt-1">Please enter your email</span>
        )}
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="phoneNum" className="text-richblack-5">
          Phone Number
        </label>
        <div className="flex gap-2">
          <select
            id="dropdown"
            name="dropdown"
            {...register("dropdown", { required: true })}
            className="max-w-[55px] bg-richblack-700 text-richblack-5 rounded-sm outline-none"
          >
            {CountryCode.map((element, index) => {
              return (
                <option key={index} value={element.code}>
                  {element.code} -{element.country}
                </option>
              );
            })}
          </select>
          <input
            type="number"
            name="phoneNum"
            id="phoneNum"
            placeholder="Enter your number"
            {...register("phoneNum", {
              required: {
                value: true,
                message: "Please enter your phone number",
              },
              maxLength: { value: 10, message: "Invalid phone number" },
              minLength: { value: 10, message: "Invalid phone number" },
            })}
            className="px-4 py-2 bg-richblack-700 rounded-md outline-none text-richblack-5 w-full"
          />
        </div>
          {errors.phoneNum &&  <span className="text-yellow-100 text-[10px] -mt-1">
              {errors.phoneNum.message}
            </span>}
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="message" className="text-richblack-5">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          {...register("message", { required: true })}
          className="px-4 py-2 bg-richblack-700 rounded-md outline-none text-richblack-5"
        ></textarea>
        {errors.message && (
          <span className="text-yellow-100 text-[10px] -mt-1">Please enter your message</span>
        )}
      </div>
      <button
        type="submit"
        className="text-center bg-yellow-50 rounded-md text-semibold py-3"
      >
        Send message
      </button>
    </form>
  );
}
