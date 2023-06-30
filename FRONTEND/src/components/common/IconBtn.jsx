import React from "react";

export default function IconBtn({
  text,
  onClick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`flex items-center justify-center ${
        outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50 text-richblack-800"
      } cursor-pointer gap-x-2 rounded-md py-2 px-2 md:px-5 font-semibold  ${customClasses}`}
    >
      {children ? (
        <>
          <span className="">{text}</span>
          {children}
        </>
      ) : (
        <span className="">{text}</span>
      )}
    </button>
  );
}
