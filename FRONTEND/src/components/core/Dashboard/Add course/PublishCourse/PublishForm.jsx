import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import IconBtn from "../../../../common/IconBtn";
import {useNavigate} from 'react-router-dom'
import { updateCourse } from "../../../../../services/operations/courseDetailsApi";
export default function PublishForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  function handlePublishCourse() {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      goToCourses()
      return 
    }
    const formData =  new FormData();
    formData.append('courseId',course._id);
    const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append('status',courseStatus);
    const response = updateCourse(formData,token);
    if(response){
      goToCourses()
    }
  }
  function goToCourses(){
    dispatch(resetCourseState());
    navigate('/dashboard/my-courses');
  }
  function onSubmit() {
    handlePublishCourse()
  }
  function goBack() {
    dispatch(setStep(2));
  }
  return (
    <div className="bg-richblack-800 border border-richblack-700 min-h-[150px]">
      <div className="flex flex-col p-4 gap-3">
        <p className="font-bold text-2xl text-richblack-5">Publish</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-x-3">
            <input
              type="checkbox"
              id="public"
              name="public"
              {...register("public", { required: true })}
              className=''
            />
            <label htmlFor="public" className="text-richblack-5 text-lg">
              Mark this course as public
            </label>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <button
              className="text-richblack-300 bg-richblack-700 border px-5 py-2 rounded-md"
              type="button"
              onClick={goBack}
            >
              Back
            </button>

            <IconBtn text="Publish" type="submit"></IconBtn>
          </div>

        </form>
      </div>
    </div>
  );
}
