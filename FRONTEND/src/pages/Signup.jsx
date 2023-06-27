import React from 'react'
import Template from '../components/core/Auth/Template'
import frame from '../assets/Images/frame.png'
import signupImage from '../assets/Images/signup.webp'
export default function Signup() {
  return (
    <Template
    heading={"Join the millions learning to code with StudyNotion for free"}
    description1={"Build skills for today, tomorrow, and beyond."}
    description2={"Education to future-proof your career."}
    formType={"signup"}
    frame={frame}
    image={signupImage}
  />
  )
}
