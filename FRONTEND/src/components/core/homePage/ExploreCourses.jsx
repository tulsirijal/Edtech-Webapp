import React, { useState } from "react";
import HighlightText from "./HighlightText";
import { HomePageExplore } from "../../../data/homepage-explore";
export default function ExploreCourses() {
  const tabNames = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
  ];

  const [currentTab, setcurrentTab] = useState(tabNames[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );
  function handleClick(value) {
    setcurrentTab(value);
    const result = HomePageExplore.filter((item) => item.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
    console.log(result);
  }
  function handleCurrentCard(index) {
    setCurrentCard(courses[index].heading);
  }
  console.log(currentCard);

  return (
    <div>
      <div className="flex flex-col">
        <p className="font-semibold text-4xl text-center">
          Unlock the <HighlightText text={"Power of code"} />
        </p>
        <p className="font-semibold text-base text-richblack-300 text-center">
          Learn to Build Anything You Can Imagine
        </p>
        {/* current tab */}
        <div className="hidden md:flex w-fit mx-auto items-center gap-10 border border-none rounded-full px-2 py-[5px] my-4 transition-all duration-200 bg-richblack-800 text-richblack-300">
          {tabNames.map((element, index) => {
            return (
              <div
                className={`${
                  currentTab === element
                    ? "bg-richblack-900 text-richblack-5 rounded-full px-7 py-[7px] cursor-pointer"
                    : "transition-all duration-200"
                }`}
                onClick={() => handleClick(element)}
                key={index}
              >
                {element}
              </div>
            );
          })}
        </div>
      </div>
      {/* courses card */}
      <div className="my-4 flex flex-col md:flex-row items-center gap-5 lg:translate-y-[10%]">
        {courses.map((course, index) => {
          return (
            <div
              key={index}
              onClick={() => handleCurrentCard(index)}
              className={`${
                currentCard === course.heading
                  ? "bg-white text-richblack-400 "
                  : "text-richblack-400 bg-richblack-800"
              } flex flex-col justify-between items-center  gap-10 w-[360px] lg:w-[30%] min-h-[300px]`}
            >
              <div className="p-6">
                <p
                  className={`${
                    currentCard === course.heading
                      ? "text-richblack-800"
                      : "text-white"
                  } mt-1 mb-2 self-start font-semibold text-[20px]`}
                >
                  {course.heading}
                </p>
                <p>{course.description}</p>
              </div>
              <div
                className={`w-full pb-4 ${
                  currentCard === course.heading ? "text-blue-300" : ""
                } `}
              >
                <div className="border-t border-dotted w-full h-[1px]"></div>
                <div className="flex justify-between items-center px-8 pt-2">
                  <div className="flex  items-center gap-2">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                    </svg>
                    <p>{course.level}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      version="1.1"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15.25 12h-0.25v-3.25c0-0.965-0.785-1.75-1.75-1.75h-4.25v-2h0.25c0.412 0 0.75-0.338 0.75-0.75v-2.5c0-0.413-0.338-0.75-0.75-0.75h-2.5c-0.412 0-0.75 0.337-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h0.25v2h-4.25c-0.965 0-1.75 0.785-1.75 1.75v3.25h-0.25c-0.412 0-0.75 0.338-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h2.5c0.413 0 0.75-0.338 0.75-0.75v-2.5c0-0.412-0.337-0.75-0.75-0.75h-0.25v-3h4v3h-0.25c-0.412 0-0.75 0.338-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h2.5c0.412 0 0.75-0.338 0.75-0.75v-2.5c0-0.412-0.338-0.75-0.75-0.75h-0.25v-3h4v3h-0.25c-0.412 0-0.75 0.338-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h2.5c0.412 0 0.75-0.338 0.75-0.75v-2.5c0-0.412-0.338-0.75-0.75-0.75zM3 15h-2v-2h2v2zM9 15h-2v-2h2v2zM7 4v-2h2v2h-2zM15 15h-2v-2h2v2z"></path>
                    </svg>
                    <p>{course.lessionNumber} lessions</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
