import React, { useState } from 'react'
import {AiOutlineDown,AiOutlineUp} from 'react-icons/ai';
import {BiVideo} from 'react-icons/bi'
export default function Lectures({section}) {
    const [isOpen,setIsOpen] = useState(false);
  return (
    <div className='bg-richblack-800'>
    <div className='text-richblack-5 px-4 py-3 flex items-center gap-2' onClick={()=>setIsOpen(prev=>!prev)}>
        {isOpen ? <AiOutlineUp/> : <AiOutlineDown/>}
            <h4 className='' >{section.sectionName}</h4>
    </div>
       {isOpen && <div className='bg-black'>
            {
                section.subSection.map((subsection)=>{
                    return <div key={subsection._id} className='px-4 py-3 flex items-center gap-2 '>
                         <BiVideo className='text-richblack-5' />
                        <p className='text-richblack-5 '>{subsection.title}</p>
                    </div>
                })
            }
        </div>}
    </div>
  )
}
