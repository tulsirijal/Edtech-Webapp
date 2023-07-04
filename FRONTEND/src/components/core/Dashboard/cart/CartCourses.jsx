import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../../slices/cartSlice";
import RatingStars from "../../../common/RatingStars";
import IconBtn from "../../../common/IconBtn";
import stripePayment from "../../../../services/operations/payment";
export default function CartCourses() {
  const { cartItem, totalPrice } = useSelector((state) => state.cart);
  const {token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  let coursesId = [];
  for(const item of cartItem){
    coursesId.push(item._id);
  }
  function handleRemoveFromCart(course) {
    dispatch(removeFromCart(course));
  }
  function handleBuyNow(){
    stripePayment(coursesId,token)
  }
  console.log(coursesId);
  return (
    <div className="mt-3 flex flex-col md:flex-row justify-between  gap-5 ">
      <div className="flex flex-col gap-5 flex-1">
          {cartItem?.map((course, index) => {
            return (
              <div key={index} className="flex items-center justify-between ">
                <div className="flex flex-col md:flex-row  ">
                  <div>
                    <img
                      className="w-11/12 max-w-[250px] rounded-md"
                      src={course.thumbnail}
                    />
                  </div>
                  <div className="text-richblack-5 flex flex-col gap-2">
                    <p className="font-semibold text-2xl">{course.name}</p>
                    <p className="text-richblack-300">{course.category.name}</p>
                    <div className="flex gap-2 items-center">
                      <span className="text-yellow-25">
                        {course.ratingAndReviews.length}
                      </span>
                      <RatingStars />
                      <span className="text-richblack-300 text-sm">
                        {course?.ratingAndReviews?.length} Ratings
                      </span>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div>
                    <button
                      className=" flex items-center gap-1 bg-richblack-700 px-4 py-2 rounded-sm text-pink-300 "
                      onClick={() => handleRemoveFromCart(course)}
                    >
                      <RiDeleteBin6Line />
                      Remove
                    </button>
                    <p className="text-yellow-25 text-4xl mt-2">
                      ${course?.price}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="bg-richblack-800 w-[200px] min-h-[130px] p-5 self-start rounded-md space-y-2">
        <p className="text-richblack-300 text-sm">Total:</p>
        <p className="text-2xl text-yellow-25">${totalPrice}</p>
        <IconBtn text="Buy now" onClick={handleBuyNow} />
      </div>
    </div>
  );
}
