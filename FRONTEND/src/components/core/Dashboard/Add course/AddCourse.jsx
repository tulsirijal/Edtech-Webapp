import React from 'react'
import RenderSteps from './RenderSteps'

export default function AddCourse() {
  return (
    <div className='h-[calc(100vh-3.5rem)]'>
      <div className='flex flex-col md:flex-row min-h-screen w-full mt-[90px] gap-10 '>
          <div className='w-full'>
            <p className='font-bold text-richblack-5 text-4xl mb-2'>Add Course</p>
            <RenderSteps/>
          </div>
          <div>
              <p className='text-richblack-5 font-bold '>Course build tips</p>
              <ul className='text-richblack-5 text-[12px] list-disc'>
                  <li>Set the Course Price option or make it free.</li>
                  <li>Standard size for the course thumbnail is 1024x576.</li>
                  <li>Video section controls the course overview video.</li>
                  <li>Course Builder is where you create & organize a course.</li>
                  <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                  <li>Information from the Additional Data section shows up on the course single page.</li>
                  <li>Make Announcements to notify any important</li>
                  <li>Notes to all enrolled students at once.</li>
              </ul>
          </div>
      </div>
    </div>
  )
}
