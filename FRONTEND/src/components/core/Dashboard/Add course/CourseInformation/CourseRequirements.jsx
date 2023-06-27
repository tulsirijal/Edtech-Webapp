
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function CourseRequirements({
  name,
  label,
  register,
  setValue,
  getValues,
  errors,
  id,
}) {
  const [requirements, setRequirements] = useState("");
  const [requirementList, setRequirementList] = useState([]);
  const {editCourse,course} = useSelector(state=>state.course);
  function handleAddRequirement() {
    if (requirements) {
      setRequirementList([...requirementList, requirements]);
      setRequirements("");
    }
  }
  function handleRemoveRequirement(index) {
    const newList = [...requirementList];
    newList.splice(index, 1);
    setRequirementList(newList);
  }
  useEffect(()=>{
    if(editCourse){
      setRequirementList(course?.instructions)
    }
    register(name,{required:true});

  },[]);
  useEffect(()=>{
    setValue(name,requirementList)
  },[requirementList])
  return (
    <div>
      <label htmlFor={name} className="text-richblack-5 font-bold">{label} <sup className="text-pink-50">*</sup></label>
      <input
        type="text"
        name={name}
        id={name}
        onChange={(e)=>setRequirements(e.target.value)}
        className="w-full h-[40px] bg-richblack-700 text-richblack-5 outline-none px-2 rounded-md"
      />
      <button type="button" className="text-yellow-50" onClick={handleAddRequirement}>Add</button>
      {
       requirementList.length > 0 &&  requirementList.map((list,index)=>{
          return <ul key={index}>
            <li className="text-richblack-5">{list} <span className="cursor-pointer text-[10px] text-richblack-300" onClick={()=>handleRemoveRequirement(index)}>clear</span></li>
          </ul>
        })
      }
      {
        errors[name] && <span className=" ml-4 text-sm text-yellow-300">
          {label} is required
        </span>
      }
    </div>
  );
}
