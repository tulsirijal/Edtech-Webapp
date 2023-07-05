import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userEnrolledCourses } from "../../../services/operations/profileApi";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";
export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const navigate = useNavigate();
  async function getEnrolledCourses() {
    try {
      const response = await userEnrolledCourses(token);
      console.log(response)
      setEnrolledCourses(response);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getEnrolledCourses();
  }, []);
  return (
    <div>
      <div className="text-3xl text-white">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="flex items-center justify-center h-[calc(100vh-3rem)] text-richblack-5">
          Loading...
        </div>
      ) : enrolledCourses.length == 0 ? (
        <p className="text-richblack-300 font-medium text-lg">
          You have not enrolled in any courses.
        </p>
      ) : (
        <div className="h-[calc(100vh-3rem)] mt-[90px]">
          <div className="flex flexp-row rounded-t-lg bg-richblack-500 text-richblack-5">
            <p className="w-[45%] px-2 md:px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Durations</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {enrolledCourses.map((course, index) => {
            return (
              <div
                className="flex items-center"
                key={index}
                onClick={() =>
                  navigate(
                    `/view-course/${course._id}/section/${course?.courseContent?.[0]._id}/sub-section/${course?.courseContent?.[0].subSection?.[0]._id}`
                  )
                }
              >
                <div className="flex text-richblack-5 w-[45%] items-center gap-4 py-4 px-2">
                  <img
                    src={course.thumbnail}
                    className="h-14 w-14 object-cover"
                  />
                  <div>
                    <p className="font-semibold">{course.name}</p>
                    <p className="text-xs text-richblack-300 hidden md:block">
                      {course.description}
                    </p>
                  </div>
                </div>
                <div className="text-richblack-5 w-1/4 md:px-4 self-center">
                  {course.totalDuration || "1hr20min"}
                </div>

                <div className="w-1/5 ">
                  <p className="mb-1 text-richblack-5">
                    Progress: {course.progressPercentage || 0}%
                  </p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
