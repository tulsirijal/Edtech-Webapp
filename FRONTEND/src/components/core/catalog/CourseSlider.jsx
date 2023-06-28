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
        <Swiper>
            {courses?.map((course, index) => {
              return (
               <SwiperSlide key={index}>
                 <CourseCard course={course} />
               </SwiperSlide>
              );
            })}
        </Swiper>
      ) : (
        <p>No courses found</p>
      )}
    </div>
  );
}
