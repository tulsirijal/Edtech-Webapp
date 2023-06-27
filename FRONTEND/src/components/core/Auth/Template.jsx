import React from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

export default function Template({heading,description1,description2,formType,frame,image}) {
  return (
    <div className=' min-h-screen'>
      <div className='w-11/12 max-w-maxContent mt-20 mx-auto flex flex-col-reverse md:flex-row gap-10 justify-between'>
        {/* form div */}
        <div className='flex flex-col gap-2 w-11/12 max-w-[450px] mx-auto mb-8'>
          <h1 className='font-semibold text-[1.875rem] leading-[2.275rem]  text-richblack-5'>{heading}</h1>
          <div className='mt-4 mb-2'>
              <p className='font-semibold text-[1.125rem] text-richblack-100'>{description1}</p>
              <p className='font-edu-sa italic font-bold text-blue-100'>{description2}</p>
          </div>
          {formType=="login" ? <LoginForm/> : <SignupForm/>}
        </div>
        {/* imnage div*/}
        <div className='relative w-11/12 mx-auto max-w-[450px] '>
            <img src={frame} width={"558"} height={"504"}/>
            <img className='absolute -top-2 right-3 md:-top-4 md:right-5' src={image} width={"558"} height={"504"}/>
        </div>
      </div>
    </div>
  )
}
