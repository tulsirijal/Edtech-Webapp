import React from "react";

export default function Stats() {
  return (
    <div className="w-11/12 h-[150px] max-w-maxContent mx-auto flex flex-wrap md:flex-row items-center justify-between gap-x-14">
      <div className="">
        <p className="font-bold text-richblack-5 text-4xl">5k</p>
        <p className="font-bold text-richblack-300">Active Students</p>
      </div>
      <div>
        <p className="font-bold text-richblack-5 text-4xl">10+</p>
        <p className="font-bold text-richblack-300">Mentors</p>
      </div>
      <div>
        <p className="font-bold text-richblack-5 text-4xl">200+</p>
        <p className="font-bold text-richblack-300">Courses</p>
      </div>
      <div>
        <p className="font-bold text-richblack-5 text-4xl">50+</p>
        <p className="font-bold text-richblack-300">Awards</p>
      </div>
    </div>
  );
}
