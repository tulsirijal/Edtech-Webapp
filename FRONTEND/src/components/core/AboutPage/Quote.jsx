import React from 'react'
import HighlightText from '../homePage/HighlightText'

export default function Quote() {
  return (
    <div className='w-11/12 font-semibold text-2xl md:text-4xl text-richblack-5 lg:text-center lg:w-[85%] mx-auto my-10'>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={" combines technology "}/>
        <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold'>
            expertise 
        </span>
        {" "}
        and community to create an {" "}
        <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold'>
        unparalleled educational experience.
        </span>
    </div>
  )
}
