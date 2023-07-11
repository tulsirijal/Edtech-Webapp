import React, { useEffect, useState } from "react";
import { getAllReviews } from "../../services/operations/courseDetailsApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import ReactStars from "react-rating-stars-component"
export default function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  async function getRatingAndReviews() {
    const response = await getAllReviews();
    setReviews(response);
  }
  useEffect(() => {
    getRatingAndReviews();
  }, []);
  return (
    <div className="my-5">
      {reviews.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {reviews.map((review, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="bg-richblack-800 min-h-[150px] p-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={review?.user?.image}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-[16px]">
                        {review?.user.firstName}
                      </p>
                      <p className="text-richblack-300 text-sm">
                        {review?.course.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm mt-1">{review?.reviews}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-5">{review.rating}</span>
                    <ReactStars value={review.rating} edit={false} />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <p>No reveiws</p>
      )}
    </div>
  );
}
