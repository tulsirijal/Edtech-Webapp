import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../../../../../services/apiConnector";
import { courseEndPoints } from "../../../../../services/apis";
import { HiOutlineCurrencyPound } from "react-icons/hi";
import CourseRequirements from "./CourseRequirements";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import { createCourse, updateCourse } from "../../../../../services/operations/courseDetailsApi";
import toast from "react-hot-toast";
import ChipInput from "./ChipInput";
import ThumbnailUpload from "./ThumbnailUpload";
export default function CourseInfoForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategory, setCourseCategory] = useState([]);
  async function getCourseCategory() {
    try {
      setLoading(true);
      const response = await apiConnector("GET", courseEndPoints.GET_CATEGORY);
      const categories = response.data.data;
      if (categories.length > 0) {
        setCourseCategory(categories);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    if (editCourse) {
      setValue("courseTitle", course.name);
      setValue("courseShortDesc", course.description);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    getCourseCategory();
  }, []);
  function isFormUpdated() {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.name ||
      currentValues.courseShortDesc !== course.description ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags !== course.tag ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.CourseRequirements !== course.instructions ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    } else {
      return false;
    }
  }
  async function submitCourseInfo(data) {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.name) {
          formData.append("name", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.description) {
          formData.append("description", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseTags !== course.tag) {
          formData.append("tag", data.courseTags);
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if(currentValues.courseRequirements !== course.instructions){
          formData.append('instructions',data.courseRequirements)
        }
        if(currentValues.courseImage !== course.thumbnail){
          formData.append('thumbnail',data.courseImage)
        }
        setLoading(true);
        const response = await updateCourse(formData,token);
        if(response){
          dispatch(setStep(2));
          dispatch(setCourse(response))
        }
        setLoading(false)
      }else {
        toast.error("No changes made to the form");
      }
      return
    } 
    const formData = new FormData();
    formData.append('name',data.courseTitle);
    formData.append("description",data.courseShortDesc);
    formData.append('price',data.coursePrice);
    formData.append('tag',data.courseTags);
    formData.append('whatYouWillLearn',data.courseBenefits);
    formData.append("category",data.courseCategory);
    formData.append('instructions',data.courseRequirements);
    formData.append('thumbnail',data.courseImage);
    setLoading(true);
    const response = await createCourse(formData,token);
   if(response){
     dispatch(setStep(2));
     dispatch(setCourse(response));
   }
    
    setLoading(false);
    
  }
  return (
    <form onSubmit={handleSubmit(submitCourseInfo)} className='flex flex-col gap-3'>
        <div className="flex flex-col">
          <label className="text-richblack-5 font-bold">
            Course Title <sup className="text-pink-50">*</sup>
          </label>
          <input
            type="text"
            placeholder="Course Title"
            name="courseTitle"
            id="courseTitle"
            {...register("courseTitle", { required: true })}
            className="h-[40px] bg-richblack-700 text-richblack-5 outline-none px-2 rounded-md"
          />
          {errors.courseTitle && (
            <span className="text-sm text-yellow-300">
              Course title is required
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="courseShortDesc"
            className="font-semibold text-richblack-5"
          >
            Description <sup className="text-pink-50">*</sup>{" "}
          </label>
          <textarea
            placeholder="Course description"
            name="courseShortDesc"
            id="courseShortDesc"
            {...register("courseShortDesc", { required: true })}
            className="min-h-[90px] bg-richblack-700 text-richblack-5 outline-none px-2 rounded-md"
          />
          {errors.courseShortDesc && (
            <span className="text-sm text-yellow-300">
              Course description is required
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="coursePrice"
            className="font-semibold text-richblack-5"
          >
            Price <sup className="text-pink-50">*</sup>{" "}
          </label>
          <div className="relative">
            <input
              type="text"
              name="coursePrice"
              id="coursePrice"
              {...register("coursePrice", {
                required: true,
                valueAsNumber: true,
              })}
              className="w-full h-[40px] bg-richblack-700 text-richblack-5 outline-none px-6 rounded-md"
            />
            <HiOutlineCurrencyPound className="text-lg text-richblack-300 absolute top-0 left-1  h-full" />
          </div>
          {errors.coursePrice && (
            <span className="text-sm text-yellow-300">
              Course price is required
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label
            className="font-semibold text-richblack-5"
            htmlFor="courseCategory"
          >
            Course Category <sup className="text-pink-50">*</sup>{" "}
          </label>
          <select
            name="courseCategory"
            id="courseCategory"
            defaultValue=""
            {...register("courseCategory", { required: true })}
            className="bg-richblack-700 text-richblack-300 px-2 h-[40px] outline-none rounded-md"
          >
            <option value="" disabled>
              Choose a Category
            </option>
            {courseCategory.map((category, index) => {
              return (
                <option
                  className="text-richblack-300"
                  key={index}
                  value={category?._id}
                >
                  {category?.name}
                </option>
              );
            })}
          </select>
          {errors.courseCategory && (
            <span className="text-sm text-yellow-300">
              Course category is required
            </span>
          )}
        </div>
        {/* create a component for tags */}
        <ChipInput 
          label="Tag"
          name="courseTags"
          setValue = {setValue}
          getValues={getValues}
          errors={errors}
          editData={editCourse ? course?.tag : null} 
          register = {register}
        />
        {/* create a component for uploading thumbnail */}
        <ThumbnailUpload
        label="Thumbnail"          
        name="courseImage"
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        editData={editCourse ? course.thumbnail : null}
        />
        <div className="flex flex-col">
          <label
            htmlFor="courseBenefits"
            className="font-semibold text-richblack-5"
          >
            Benefits of the course <sup className="text-pink-50">*</sup>{" "}
          </label>
          <textarea
            id="courseBenefits"
            name="courseBenefits"
            placeholder="Enter the benefits of the course"
            {...register("courseBenefits", { required: true })}
            className="w-full min-h-[90px] bg-richblack-700 text-richblack-5 outline-none px-2 rounded-md"
          />
          {errors.courseBenefits && (
            <span className="text-sm text-yellow-300">
              Benefits of the course is required
            </span>
          )}
        </div>
        {/* create a component for course requirements  */}
        <CourseRequirements
          name="courseRequirements"
          id="courseRequirements"
          setValue={setValue}
          getValues={getValues}
          label="Requirements/Instructions"
          register={register}
          errors={errors}
        />
        <div className="self-end flex ">
          {editCourse && (
            <div
              onClick={() => dispatch(setStep(2))}
              className="px-4 py-2 text-richblack-700 bg-richblack-800"
              type="button"
            >
              Continue without saving
            </div>
          )}
          <div className="self-end">
            <IconBtn
              type="submit"
              text={!editCourse ? "Next" : "Save Changes"}
            />
            
          </div>
        
        </div>
      
    </form>
  );
}
