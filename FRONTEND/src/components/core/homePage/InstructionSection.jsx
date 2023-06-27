import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import CTAbutton from "./CTAbutton";
import HighlightText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa";
export default function InstructionSection() {
  return (
    <div className="flex flex-col lg:flex-row gap-20 justify-center items-center mt-20 mb-10">
      <div className="lg:w-[50%]">
        <img src={Instructor} />
      </div>
      <div className="lg:w-[50%] flex flex-col gap-7">
        <p className="font-semibold text-4xl lg:w-[50%]">
          Become an <HighlightText text="instructor" />
        </p>
        <p className="text-richblack-300 lg:w-[80%]">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </p>
        <div className="self-start">
            <CTAbutton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                    <p>Start Teaching today</p>
                    <FaArrowRight/>
                </div>
            </CTAbutton>
        </div>
      </div>
    </div>
  );
}
