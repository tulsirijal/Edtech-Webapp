import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";

import { HiDocumentAdd } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsApi";
import NestedSection from "./NestedSection";
export default function CourseBuildForm() {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getFieldState,
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  function cancleEdit() {
    setEditSectionName(null);
    setValue("sectionName", "");
  }
  function goBack() {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }
  function goToNext() {
    if (course.courseContent.length === 0) {
      toast.error("Please add section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Add lecture in section");
      return;
    }
    dispatch(setStep(3));
  }
  async function submitSectionForm(data) {
    let response;
    if (editSectionName) {
      response = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      response = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }
    console.log(response)
    if (response) {
      dispatch(setCourse(response));
      setEditSectionName(null);
      setValue("sectionName","");
    }
  }
  function handleEditSection(sectionId, sectionName) {
    if (editSectionName === sectionId) {
      cancleEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }
  return (
    <div>
      <p className="text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(submitSectionForm)}>
        <div className="flex flex-col w-full">
          <label
            htmlFor="sectionName"
            className="text-richblack-5 font-semibold"
          >
            Section Name <sup className="text-pink-50">*</sup>
          </label>
          <input
            type="text"
            placeholder="Section name"
            id="sectionName"
            name="sectionName"
            {...register("sectionName", { required: true })}
            className="outline-none bg-richblack-700 h-[40px] px-2 text-richblack-5 "
          />
          {errors.sectionName && (
            <span className="text-sm text-yellow-300">
              Section name is required
            </span>
          )}
        </div>
        <div className="mt-10 flex gap-4">
          <IconBtn
            text={editSectionName ? "Edit section name" : "create section"}
            type="submit"
            outline={true}
            customClasses={"text-richblack-5"}
          >
            <HiDocumentAdd className="text-yellow-50" />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancleEdit}
              className=" underline text-richblack-700 text-xs"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {course?.courseContent?.length > 0 && (
        <NestedSection handleEditSection={handleEditSection} />
      )}
      <div className="flex gap-3 mt-10">
        <button type="button" onClick={goBack} className="text-richblack-5">
          Back
        </button>
        <IconBtn type="button" text={"Next"} onClick={goToNext} />
      </div>
    </div>
  );
}
