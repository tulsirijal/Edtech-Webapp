import React, { useEffect } from "react";
import {  useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch,useSelector } from "react-redux";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsApi";
import { setCourse } from "../../../../../slices/courseSlice";
import { ImCross } from "react-icons/im";
import ThumbnailUpload from "../CourseInformation/ThumbnailUpload";
import IconBtn from "../../../../common/IconBtn";
export default function SubsectionModal({
  modalData,
  setModalData,
  edit = false,
  view = false,
  add = false,
}) {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  function isFormUpdated() {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  }
  async function handleEditSubsection() {
    const currentValues = getValues();
    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);
    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }    
    const response = await updateSubSection(formData, token);
    if (response) {
      const updatedCourse = course.courseContent.map(section=>section._id===modalData.sectionId ? response : section);
      dispatch(setCourse({...course,courseContent:updatedCourse}));
    }
    setModalData(null);
  }
  async function onSubmit(data) {
    if (view) {
      return;
    }
    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made");
      } else {
        handleEditSubsection();
      }
      return;
    }
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);
    // api call
    const response = await createSubSection(formData, token);
    if (response) {
      const updatedCourse = course?.courseContent.map(section=>section._id === modalData? response : section);
      console.log(updatedCourse)
      dispatch(setCourse({...course,courseContent:updatedCourse}));
    }
    setModalData(null);
  }
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10   max-w-[700px] w-11/12 rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex justify-between items-center mt-10 p-5 bg-richblack-700 rounded-t-lg">
          <p className="text-richblack-5 text-xl font-semibold">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => setModalData(null)}>
            <ImCross className="text-lg text-richblack-300 " />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='px-8 py-10 space-y-4'>
          <ThumbnailUpload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            video={true}
            errors={errors}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
          <div className="flex flex-col gap-1">
            <label className="text-richblack-5 font-medium" htmlFor="lectureTitle">Lecture Title <sup className="text-pink-50">*</sup> </label>
            <input
              type="text"
              placeholder="Title"
              id="lectureTitle"
              name="lectureTitle"
              {...register("lectureTitle", { required: true })}
              className='bg-richblack-700 rounded-lg p-3 text-[16px] outline-none text-richblack-5'
            />
            {
              errors.lectureTitle && <span className="text-sm text-yellow-50">Title is required</span>
            }
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-richblack-5 font-medium" htmlFor="lectureDesc">Lecture Description</label>
            <textarea
              type="text"
              placeholder="Title"
              id="lectureDesc"
              name="lectureDesc"
              {...register("lectureDesc", { required: true })}
              className="min-h-[70px] bg-richblack-700 text-[16px] outline-none text-richblack-5 p-3 rounded-lg"
            />
            {
              errors.lectureDesc && <span className="text-sm text-yellow-50">Description is required</span>
            }
          </div>
        {!view &&  <IconBtn text={"save"} type='submit' />}
        </form>
      </div>
    </div>
  );
}
