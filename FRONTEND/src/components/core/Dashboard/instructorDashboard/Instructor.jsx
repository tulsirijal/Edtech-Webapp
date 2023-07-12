import React, { useEffect, useState } from "react";
import { getInstructorData } from "../../../../services/operations/profileApi";
import { useSelector } from "react-redux";
import { getInstructorCourses } from "../../../../services/operations/courseDetailsApi";
import { Link } from "react-router-dom";
import InstructorCharts from "./InstructorCharts";
export default function Instructor() {
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  useEffect(() => {
    async function fetchInstructorData() {
      const instructorStats = await getInstructorData(token);
      if (instructorStats.length) {
        setInstructorData(instructorStats);
      }
      const response = await getInstructorCourses(token);
      if (response) {
        setCourses(response);
      }
    }
    fetchInstructorData();
  }, []);

  const totalAmount = instructorData?.reduce(
    (acc, current) => acc + current.totalAmount,
    0
  );
  const totalStudents = instructorData?.reduce(
    (acc, current) => acc + current.totalStudentsEnrolled,
    0
  );

  return (
    <div className="h-[calc(100vh-3rem)] mt-[90px]">
      <div className="my-5">
        <h2 className="text-2xl text-richblack-5 font-semibold">
          Hi, {user.firstName} 
        </h2>
        <p className="text-richblack-5">Let's start something new</p>
      </div>
      <div>
        {courses.length > 0 ? (
          <div>
            <div className="flex flex-col md:flex-row gap-4 min-h-[450px] ">
              {totalAmount > 0 || totalStudents > 0 ? (
                <InstructorCharts courses={instructorData} />
              ) : (
                <div className="flex-1 rounded-md bg-richblack-800 p-6">
                  <p className="text-lg font-bold text-richblack-5">
                    Visualize
                  </p>
                  <p className="mt-4 text-xl font-medium text-richblack-50">
                    Not Enough Data To Visualize
                  </p>
                </div>
              )}

              <div className="min-w-[250px] bg-richblack-800 p-6 rounded-md flex flex-col gap-3">
                <div className="">
                  <p className="text-richblack-5 text-2xl font-semibold">
                    Statistics
                  </p>
                  <div className="mt-4">
                    <p className="text-xl text-richblack-300">Total Courses</p>
                    <p className="text-richblack-5 font-bold text-xl">
                      {courses?.length}
                    </p>
                  </div>
                </div>
                <div className="text-richblack-300">
                  <p className="text-xl text-richblack-300">Total Income </p>
                  <div className="">
                    <p className="text-richblack-5 font-bold text-xl">
                      {totalAmount}
                    </p>
                  </div>
                </div>
                <div className="text-richblack-300">
                  <p className="text-xl text-richblack-300">Total Students </p>
                  <div className="">
                    <p className="text-richblack-5 text-xl font-bold">
                      {totalStudents}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-richblack-800 p-4 rounded-md my-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-richblack-5 font-bold">Your Courses</p>
                <Link to={"/dashboard/my-courses"}>
                  <span className="text-yellow-25 text-sm">View all</span>
                </Link>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                {courses.slice(0, 3).map((course) => {
                  return (
                    <div key={course._id} className="">
                      <img
                        className="w-full md:max-w-[250px] min-h-[150px] object-cover mb-2"
                        src={course?.thumbnail}
                      />
                      <div className="w-full">
                        <p className="text-lg font-medium text-richblack-50">
                          {course?.name}
                        </p>
                        <div className=" flex items-center gap-2">
                          <p className="text-xs font-medium text-richblack-300">
                            {course?.studentEnrolled.length} students
                          </p>
                          <p className="text-xs font-medium text-richblack-300">
                            |
                          </p>
                          <p className="text-xs font-medium text-richblack-300">
                            Rs. {course.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
            <p className="text-center text-2xl font-bold text-richblack-5">
              You have not created any courses yet
            </p>
            <Link to="/dashboard/add-course">
              <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
                Create a course
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
