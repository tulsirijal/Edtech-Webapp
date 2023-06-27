import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../Add course/RenderSteps'
export default function EditCourse() {
    const {course} = useSelector(state=>state.course);
    const dispatch = useDispatch();
    const {token} = useSelector(state=>state.auth);
    const {courseId} = useParams();
    const [loading,setLoading] = useState();
  return (
    <div>
      <p className='text-2xl md:text-4xl text-richblack-5'>Edit course</p>
      <div>
        {
          course ? <RenderSteps/> : <p className='text-richblack-300'>Course not found</p>
        }
      </div>
    </div>
  )
}
