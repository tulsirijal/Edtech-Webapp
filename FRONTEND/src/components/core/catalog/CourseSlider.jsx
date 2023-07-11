import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import CourseCard from "./CourseCard";
export default function CourseSlider({ courses }) {
  return (
    <div>
      {courses?.length ? (
        <Swiper
        slidesPerView={(1)}
        loop={true}
        breakpoints={{
            1000:{slidesPerView:3}
        }}
        >
            {courses?.map((course, index) => {
              return (
               <SwiperSlide key={index}>
                 <CourseCard course={course} />
               </SwiperSlide>
              );
            })}
        </Swiper>
      ) : (
        <p className="text-richblack-5 text-2xl text-center">No courses found</p>
      )}
    </div>
  );
}
