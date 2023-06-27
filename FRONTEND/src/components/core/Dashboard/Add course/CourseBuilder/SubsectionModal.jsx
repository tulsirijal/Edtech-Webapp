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
    <div>
      <div>
        <div className="flex justify-between items-center mt-10">
          <p className="text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => setModalData(null)}>
            <ImCross className="text-lg text-richblack-300 " />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="flex flex-col">
            <label className="text-richblack-5" htmlFor="lectureTitle">Lecture Title</label>
            <input
              type="text"
              placeholder="Title"
              id="lectureTitle"
              name="lectureTitle"
              {...register("lectureTitle", { required: true })}
            />
            {
              errors.lectureTitle && <span className="text-richblack-5">Title is required</span>
            }
          </div>
          <div className="flex flex-col">
            <label className="text-richblack-5" htmlFor="lectureDesc">Lecture Description</label>
            <textarea
              type="text"
              placeholder="Title"
              id="lectureDesc"
              name="lectureDesc"
              {...register("lectureDesc", { required: true })}
              className="min-h-[70px]"
            />
            {
              errors.lectureDesc && <span>Description is required</span>
            }
          </div>
        {!view &&  <IconBtn text={"save"} type='submit' />}
        </form>
      </div>
    </div>
  );
}
