import React from "react";
import { Link } from "react-router-dom";
export default function CTAbutton({ children, linkto, active }) {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[16 px] py-2 px-4 md:py-3 md:px-6 rounded-md hover:scale-95 transition-all duration-200 ${
          active ? "bg-yellow-50  text-black" : "bg-richblack-800 text-white"
        }`}
      >
        {children}
      </div>
    </Link>
  );
}
