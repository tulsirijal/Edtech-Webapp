import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars";
export default function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course._id}`}>
      <div className="flex flex-col gap-1 ">
        <img src={course?.thumbnail} className='h-[250px] w-[350px] rounded-md' /> 
        <p className="text-richblack-5 text-xl mt-2">{course?.name}</p>
        <p className="text-richblack-100">
          Course created by{" "}
          <span className="text-yellow-25">
            {course?.instructor?.firstName} {course?.intructor?.lastName}
          </span>
        </p>
        <div className="flex items-center gap-3">
            <p className="text-richblack-5">{course?.ratingAndReviews?.length}</p>
            <RatingStars />
            <p className="text-richblack-300">{course?.ratingAndReviews?.length} Reviews</p>
        </div>
        <p className="text-richblack-5 text-xl">${course.price}</p>
      </div>
    </Link>
  );
}
