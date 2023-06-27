import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getFullCourseDetails } from '../../../../services/operations/courseDetailsApi';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import RenderSteps from '../Add course/RenderSteps'
export default function EditCourse() {
    const {course} = useSelector(state=>state.course);
    const dispatch = useDispatch();
    const {token} = useSelector(state=>state.auth);
    const {courseId} = useParams();
    async function fetchFullCourseDetails(){
      const response = await getFullCourseDetails(courseId,token);
      if(response?.courseDetails){
        dispatch(setEditCourse(true));
        dispatch(setCourse(response?.courseDetails))
      }
    }
    useEffect(()=>{
      fetchFullCourseDetails()

    },[])
  return (
    <div className='h-[calc(100vh-3.5rem)]'>
      <p className='text-2xl md:text-4xl font-bold text-richblack-5 mt-[100px] mb-4'>Edit course</p>
      <div className='mx-auto max-w-[600px]'>
        {
          course ? <RenderSteps/> : <p className='"mt-14 text-center text-3xl font-semibold text-richblack-100'>Course not found</p>
        }
      </div>
    </div>
  )
}
