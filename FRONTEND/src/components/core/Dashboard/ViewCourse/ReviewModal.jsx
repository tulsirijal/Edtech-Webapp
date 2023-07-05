import React from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import IconBtn from "../../../common/IconBtn";
import { addRatingAndReview } from "../../../../services/operations/courseDetailsApi";
export default function ReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const {entireCourseData} = useSelector((state)=>state.viewCourse);
  const {token} = useSelector((state)=>state.auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm();
  function ratingChanged(newRating){
    console.log('rating', newRating);
    setValue('courseRating',newRating);
  }
  async function onSubmit(data) {
   await  addRatingAndReview({courseId:entireCourseData._id,rating:data.courseRating,reviews:data.review},token);
  }
  return (
    <div className="z-[9999] fixed inset-0 backdrop-blur-sm flex items-center justify-center">
      <div className="w-11/12 max-w-[450px] border border-richblack-400 rounded-lg bg-richblack-800">
        <div className="flex items-center justify-between px-4 py-4  bg-richblack-700">
          <p className="font-bold text-richblack-5">Add Review</p>
          <div onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-3xl text-richblack-100" />
          </div>
        </div>
        <div className="flex  items-center justify-center mt-5">
          <img src={user?.image} className="w-12 h-12 rounded-full" />
          <div>
            <p className="text-richblack-5 font-bold text-">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-richblack-100 text-sm">posting publicly</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center"
        >
          <ReactStars count={5} activeColor="#ffd700" size={24} onChange={ratingChanged} />
          <div className="self-start  flex flex-col  px-5 py-2 gap-3 w-full bg-richblack-800">
            <label className="text-richblack-5 text-sm px-4 self-start">
              Add your experience <sup className="text-pink-50">*</sup>{" "}
            </label>
            <textarea name="review" id="review" className="w-11/12 h-[100px] bg-richblack-700 self-center outline-none text-richblack-5 px-2"
             {...register("review",{required:true})}
             />
             {errors.review && <span className="text-xs text-yellow-50">Review is required</span>}
          </div>
          <div className="self-end flex items-center gap-3 px-5 py-4">
            <button
              type="button"
              className="text-black bg-richblack-500 px-3 py-2 rounded-md font-bold "
              onClick={() => setReviewModal(false)}
            >
              Cancel
            </button>
            <IconBtn type='submit' text='Save' />
          </div>
        </form>
      </div>
    </div>
  );
}
