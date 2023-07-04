import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import RatingStars from "../components/common/RatingStars";
import { apiConnector } from "../services/apiConnector";
import { courseEndPoints } from "../services/apis";
import { BiErrorCircle } from "react-icons/bi";
import { BsGlobe, BsFillPlayFill, BsShare } from "react-icons/bs";
import formatDate from "../utils/dateFormatter";
import IconBtn from "../components/common/IconBtn";
import Lectures from "../components/core/CourseDetails/Accordion";
import Footer from "../components/core/homePage/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import stripePayment from "../services/operations/payment";
export default function CourseDetails() {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [noOfLectures, setNoOfLecutures] = useState(0);
  const [totalTimeOfContent,setTotalTimeOfContent] = useState(0);
  const {user} = useSelector((state)=>state.profile);
  const {course} = useSelector((state)=>state.course);
  const {token} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  async function fetchCoursDetails() {
    let toastId;
    try {
      toastId = toast.loading("Loading");
      const response = await apiConnector(
        "POST",
        courseEndPoints.GET_COURSE_DETAILS,
        { courseId: courseId }
      );
      console.log(response.data.data.courseDetails);
      setCourseDetails(response.data.data.courseDetails);
      toast.dismiss(toastId);
    } catch (error) {
      console.log(error);
      toast.dismiss(toast);
    }
  }
  async function handleCopyUrl() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Copied in clipboard");
    } catch (error) {
      console.log(error);
      toast.error("Unable to copy the link");
    }
  }
  function getNoOFLectures() {
    let lectureNo = 0;
    courseDetails?.courseContent.forEach((section) => {
      lectureNo += section.subSection.length;
      setNoOfLecutures(lectureNo);
    });
  }
  function getTotalTime(){
    let totalTime = 0;
    courseDetails?.courseContent.forEach((section)=>{
        section.subSection.forEach((subsection)=>{
            totalTime+=parseFloat(subsection.timeDuration);
            setTotalTimeOfContent(totalTime);
        })
    })
  }
  function handleAddToCart(){
    if(!user){
        return toast.error("You need to be logged in ");
    }
    if(courseDetails?.studentEnrolled?.includes(user._id)){
      toast.error("Already enrolled in the course");
      return 
    }
    dispatch(addToCart(courseDetails));
  }
  function handleBuyNow(){
    stripePayment([courseDetails._id],token);
  }
  useEffect(() => {
    getNoOFLectures();
    getTotalTime();
  }, [courseDetails]);
  useEffect(() => {
    fetchCoursDetails();
  }, [courseId]);
  return (
    <div className="">
      {/* top part */}
      <div className="relative bg-richblack-800 pb-5">
        <div className="w-11/12 max-w-maxContent mx-auto  flex flex-col gap-3 pt-[50px] md:py-[100px]">
          <img src={courseDetails?.thumbnail} className=" md:hidden pt-10" />
          <h3 className="text-4xl font-semibold text-richblack-5 mt-5">
            {courseDetails?.name}
          </h3>
          <p className="text-richblack-300 text-lg">
            {courseDetails?.description}
          </p>
          <div className="flex flex-col md:flex-row md:items-center gap-1 j">
            <div className="flex gap-1 items-center">
              <p className="text-yellow-25">
                {courseDetails?.ratingAndReviews.length}
              </p>
              <RatingStars />
            </div>
            <p className="text-richblack-5">
              ({courseDetails?.ratingAndReviews.length} Reviews){" "}
            </p>
            <p className="text-richblack-5">
              {courseDetails?.studentEnrolled.length} Students Enrolled
            </p>
          </div>
          <p className="text-richblack-5 text-md">
            Created by {courseDetails?.instructor.firstName}
          </p>
          <div className="flex items-center gap-1 text-richblack-5 text-lg">
            <BiErrorCircle />
            <p className="border-r border-richblack-5 px-2">
              {formatDate(courseDetails?.createdAt)}{" "}
            </p>
            <div className="flex items-center gap-2 ml-2 ">
              <BsGlobe />
              <p>English</p>
            </div>
          </div>
        </div>
        {/* buy now or add to cart */}
        <div
          className="md:bg-richblack-700 w-11/12 md:max-w-[400px] mx-auto rounded-md 
         p-4 md:absolute top-[2rem] md:right-[1rem] md:border-none
         border-t border-b border-richblack-300 my-5"
        >
          <img
            src={courseDetails?.thumbnail}
            className="rounded-lg hidden md:block"
          />
          <p className="text-richblack-5 font-bold text-4xl my-3">
            $ {courseDetails?.price}
          </p>
          <div className="flex flex-col gap-3 ">
            <IconBtn text="Buy now" onClick={handleBuyNow} />
            <button onClick={handleAddToCart} className="bg-richblack-700 md:bg-richblack-800 text-richblack-300 px-4 py-2 rounded-md">
              Add to cart
            </button>
          </div>
          <div className="md:block hidden">
            <p className="text-sm font-medium text-richblack-100 mt-2 text-center">
              30 day Money-Back guarantee{" "}
            </p>
            <p className="text-lg font-semibold text-richblack-5">
              This course includes:{" "}
            </p>
            {courseDetails?.courseContent.map((section) => {
              return (
                <div
                  key={section._id}
                  className="flex items-center gap-2 text-caribbeangreen-100"
                >
                  <BsFillPlayFill />
                  <p className="">{section.sectionName}</p>
                </div>
              );
            })}
          </div>
          <div
            className="flex items-center justify-center gap-2 text-yellow-50 cursor-pointer mt-2"
            onClick={handleCopyUrl}
          >
            <BsShare />
            <span>Share</span>
          </div>
        </div>
      </div>
      {/* what you will learn part */}
      <div className="w-11/12 max-w-maxContent mx-auto mt-10 pb-10">
        <div className="border border-richblack-700 max-w-[600px] px-4 py-3 space-y-3">
          <p className="text-richblack-5 text-3xl font-bold ">
            What you will learn
          </p>
          <p className="text-richblack-5 ">{courseDetails?.whatYouWillLearn}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold text-richblack-5">
            Course Contents
          </h3>
          <div className="text-richblack-5 flex flex-col items-start md:flex-row md:tems-center gap-2 ">
            <p>
              {courseDetails?.courseContent.length}{" "}
              {courseDetails?.courseContent.length > 1 ? (
                <span>Sections</span>
              ) : (
                <span>Section</span>
              )}
            </p>
            <p>
              {noOfLectures}{" "}
              {noOfLectures > 1 ? (
                <span>Lectures</span>
              ) : (
                <span>Lecture</span>
              )}
            </p>
            <p>{totalTimeOfContent}s total length of all videos</p>
          </div>
            <div  className="border border-richblack-700 max-w-[600px] min-h-20 transition-[height] duration-150 ease-linear my-5">
                {
                    courseDetails?.courseContent.map((section,index)=>{
                        return <Lectures key={index} section={section}/>
                    })
                }
            </div>
            <div>
                <h4 className="text-richblack-5 font-semibold text-2xl">Author</h4>
                <div className="flex items-center gap-3 mt-2">
                    <img src={courseDetails?.instructor.image} className='w-[70px] h-[70px] rounded-full' />
                    <p className="text-richblack-5">{courseDetails?.instructor.firstName} {courseDetails?.instructor.lastName}</p>
                </div>
            </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
