import React from "react";
import HighlightText from "./HighlightText"
import KnowYourProgress from '../../../assets/Images/Know_your_progress.png'
import CompareWithOthers from '../../../assets/Images/Compare_with_others.png'
import PlanYourLessons from '../../../assets/Images/Plan_your_lessons.png'
import CTAbutton from "./CTAbutton";
export default function LearnLanguage() {
  return (
    <div className="mt-20">
      <div className="flex flex-col my-5">
        <p className="text-center font-semibold text-4xl my-2 ">
          Your swiss knife for{" "}
          <HighlightText text="for learning any language" />
        </p>
        <p className="mx-auto text-center font-medium text-base text-richblack-700 lg:w-[65%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </p>
        <div className="relative flex flex-col lg:flex-row justify-center items-center mt-8">
          <img className="object-contain lg:-translate-y-[5%] lg:translate-x-[40%]" src={KnowYourProgress}/>
          <img className="object-contain lg:translate-x-[10%]" src={CompareWithOthers}/>
          <img className="object-contain lg:-translate-y-[5%] lg:-translate-x-[18%]" src={PlanYourLessons}/>
        </div>
        <div className="self-start mx-auto">
          <CTAbutton active={true} linkto={"/signup"}>
            Learn more
          </CTAbutton>
        </div>
      </div>
    </div>
  );
}
