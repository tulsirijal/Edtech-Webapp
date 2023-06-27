import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getInstructorCourses } from '../../../services/operations/courseDetailsApi';
import IconBtn from '../../common/IconBtn';
import CourseTable from './InstructorCourses/CourseTable';
export default function MyCourses() {
    const {token} = useSelector(state=>state.auth);
    const navigate = useNavigate();
    const [courses,setCourses] = useState([]);
    async function instructorCourses(){
        const response = await getInstructorCourses(token);
        if(response){
            setCourses(response)
        }
     }
    useEffect(()=>{
      instructorCourses()
    },[])
  return (
    <div>
        <div className='flex justify-between'>
            <p className='text-richblack-5 font-bold'>My Courses</p>
            <IconBtn text='Add Course' onClick={()=>navigate('/dashboard/add-course')}>+</IconBtn>
        </div>
        {courses && <CourseTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}
