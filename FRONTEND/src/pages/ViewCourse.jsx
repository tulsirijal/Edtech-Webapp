import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullCourseDetails } from '../services/operations/courseDetailsApi';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoSidebar from '../components/core/Dashboard/ViewCourse/VIdeoSidebar';
import ReviewModal from '../components/core/Dashboard/ViewCourse/ReviewModal';

export default function ViewCourse() {
    const [reviewModal,setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector(state=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        async function courseSpecificDetails(){
            const data = await getFullCourseDetails(courseId,token);
            dispatch(setCourseSectionData(data.courseDetails.courseContent));
            dispatch(setEntireCourseData(data.courseDetails));
            dispatch(setCompletedLectures(data.completedVideos));
            let lectures = 0;
            data?.courseDetails?.courseContent?.forEach((section)=>{
                lectures+= section.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures ))
        }
        courseSpecificDetails();
    },[])
  return (
    <div className='flex '>
        <VideoSidebar setReviewModal={setReviewModal} />
        <div>
            <Outlet/>
        </div>
        {reviewModal && <ReviewModal setReviewModal={setReviewModal} />}
    </div>
  )
}
