import React from "react";
import IconBtn from "./IconBtn";

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-richblack-5 text-2xl">{modalData?.text1}</p>
      <p className="text-richblack-300">{modalData?.text2}</p>
      <div className="flex gap-x-2">
        <IconBtn
          text={modalData?.btn1Text}
          onClick={modalData?.btn1Handler}
        ></IconBtn>
        <button
          className="text-richblack-300 border-[1px] border-richblack-700 px-4 py-2 rounded-md"
          onClick={modalData?.btn2Handler}
        >
          {modalData.btn2Text}
        </button>
      </div>
    </div>
  );
}
