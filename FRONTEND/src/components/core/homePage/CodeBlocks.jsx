import React from "react";
import HighlightText from "./HighlightText";
import CTAbutton from "./CTAbutton";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
export default function CodeBlocks({
  position,
  heading,
  subHeading,
  ctaBtn1,
  ctaBtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 `}>
      {/* section 1 */}
      <div className="lg:w-[50%] w-11/12 flex flex-col gap-7">
        {heading}
        <p className="text-richblack-300 font-bold ">{subHeading}</p>
        <div className="flex gap-10 mt-7">
          <CTAbutton active={ctaBtn1.active} linkto={ctaBtn1.linkto}>
            <div className="flex items-center md:gap-2">
              {ctaBtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAbutton>
          <CTAbutton active={ctaBtn2.active} linkto={ctaBtn2.linkto}>
            {ctaBtn2.btnText}
          </CTAbutton>
        </div>
      </div>
      {/* section 2 */}
      <div className=" relative h-fit code-border flex flex-row text-10[px] w-[100%] py-4 lg:w-[500px]">
        <div className={`absolute ${backgroundGradient}`}></div>
        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
        </div>
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 10000, " "]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style={{ whiteSpace: "pre-line", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}
