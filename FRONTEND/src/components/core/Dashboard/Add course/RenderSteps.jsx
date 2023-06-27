import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import CourseInfoForm from "./CourseInformation/CourseInfoForm";
import PublishForm from "./PublishCourse/PublishForm";
import { FaCheck } from "react-icons/fa";
import CourseBuildForm from "./CourseBuilder/CourseBuildForm";
export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course information",
    },
    {
      id: 2,
      title: "Course builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  return (
    <div className="">
       <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item) => (
          <Fragment key={item.id}>
            <div
              className="flex flex-col items-center "
              
            >
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}
              </button>
              
            </div>
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                  step > item.id  ? "border-yellow-50" : "border-richblack-500"
                } `}
                ></div>
              </>
            )}
          </Fragment>
        ))}
      </div>
      
      <div className="relative mb-5 flex w-full select-none justify-between">
        {steps.map((item) => (
          <Fragment key={item.id}>
            <div
              className="flex min-w-[130px] flex-col items-center gap-y-2"
              key={item.id}
            >
              
              <p
                className={`text-sm ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>
            
          </Fragment>
        ))}
      </div>
      {step === 1 && <CourseInfoForm />}
      {step === 2 && <CourseBuildForm />}
      {step === 3 && <PublishForm />}
    </div>
  );
}
