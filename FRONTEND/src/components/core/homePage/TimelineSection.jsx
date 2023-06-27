import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimelineImage from "../../../assets/Images/TimelineImage.png";
export default function TimelineSection() {
  const timeline = [
    {
      logo: Logo1,
      heading: "Leadership",
      description: "Fully committed to the success company",
    },
    {
      logo: Logo2,
      heading: "Responsibility",
      description: "Students will always be our top priority",
    },
    {
      logo: Logo3,
      heading: "Flexibility",
      description: "The ability to switch is an important skills",
    },
    {
      logo: Logo4,
      heading: "Solve the problem",
      description: "Code your way to a solution",
    },
  ];
  return (
    <div className="flex flex-col lg:flex-row gap-20 ">
      <div className="lg:w-[45%] flex flex-col gap-10">
        {timeline.map((element, index) => {
          return (
            <div key={index} className="flex flex-row gap-6 ">
              <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                <img src={element.logo} />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-[18px]">{element.heading}</p>
                <p className="text-base">{element.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="shadow-blue-200 shadow-[0px_0px_30px_0px] w-fit h-fit relative">
       
        <div className="absolute lg:left-[50%] lg:-translate-x-[50%] lg:translate-y-[-50%] bg-caribbeangreen-700 text-white uppercase  flex flex-col md:flex-row  py-4 lg:py-7">
          <div className="flex flex-row gap-10 items-center px-7 lg:px-14  border-caribbeangreen-300 md:border-r-[0.5px]">
            <p className="text-2xl font-bold">10</p>
            <div className="flex flex-col text-caribbeangreen-300">
              <p>YEARS</p>
              <p>EXPERIENCE</p>
            </div>
          </div>

          <div className="flex flex-row gap-[1.5rem] px-7 lg:px-14 items-center">
            <p className="text-2xl font-bold">250</p>
            <div className="flex flex-col text-caribbeangreen-300 ">
              <p className="">TYPES OF </p>
              <p className="">COURSES</p>
            </div>
          </div>
        </div>
        <img
          src={TimelineImage}
          className="object-cover shadow-white shadow-[20px_20px_0px_0px] h-[400px] lg:h-fit"
        />
      </div>
    </div>
  );
}
