import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userEnrolledCourses } from "../../../services/operations/profileApi";
import ProgressBar from '@ramonak/react-progress-bar';
export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  async function getEnrolledCourses() {
    try {
      const response = await userEnrolledCourses(token);
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
      <div className="font-semibold text-white">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="font-medium text-richblack-300">loading...</div>
      ) : enrolledCourses.length == 0 ? (
        <p className="text-richblack-300 font-medium text-lg">
          You have not enrolled in any courses.
        </p>
      ) : (
        <div>
          <div>
            <p>Course Name</p>
            <p>Durations</p>
            <p>Progress</p>
          </div>
          {enrolledCourses.map((course, index) => {
            return (
              <div>
                <div>
                  <img src={course.thumbnail} />
                  <div>
                    <p>{course.courseName}</p>
                    <p>{course.courseDescription}</p>
                  </div>
                </div>
                <div>{course.totalDuration}</div>

                <div>
                  <p>Progress: {course.progressPercentage || 0}%</p>
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
