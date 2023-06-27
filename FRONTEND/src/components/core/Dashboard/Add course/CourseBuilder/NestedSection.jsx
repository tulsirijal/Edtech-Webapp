import React, { useState } from "react";
import { useWatch } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { AiOutlineCaretDown, AiOutlinePlus } from "react-icons/ai";
import SubsectionModal from "./SubsectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsApi";
import { setCourse } from "../../../../../slices/courseSlice";
export default function NestedSection({ handleEditSection }) {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  async function handleDeleteSection(sectionId) {
    const response = await deleteSection({sectionId:sectionId,courseId:course._id},token);
    if(response){
        dispatch(setCourse(response));
    }
    setConfirmationModal(null);
    console.log(response);
  }
 async function handleDeleteSubSection(subSectionId,sectionId) {
    const response = await deleteSubSection({sectionId:sectionId,subSectionId:subSectionId},token);
    if(response){
       const updatedCourse = course.courseContent.map((section)=>section._id===sectionId ? response : section);
        dispatch(setCourse({...course,courseContent:updatedCourse}));
    }
    setConfirmationModal(null);
 }

  return (
    <div className=" ">
      <div className="border border-richblack-300 rounded-lg px-8 p-4">
        {course?.courseContent?.map((section, index) => {
          return (
            <details key={index} open className="">
              <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2 ">
                <div className="flex gap-4 items-center ">
                  <RxDropdownMenu className="text-richblack-300" />
                  <p className="text-richblack-50 text-2xl">{section.sectionName}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() =>
                      handleEditSection(section._id, section.sectionName)
                    }
                  >
                    <FaEdit className="text-richblack-300 " />
                  </button>
                  <button
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Delete this section",
                        text2:
                          "All the lectures in this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () =>
                          handleDeleteSection(section._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                  >
                    <RiDeleteBinFill className="text-richblack-300" />
                  </button>
                  <span className="text-richblack-300">|</span>
                  <AiOutlineCaretDown className="text-richblack-300" />
                </div>
              </summary>
              <div>
                {section.subSection.map((subsection, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => setViewSubSection(subsection)}
                      className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2 "
                    >
                      <div className="flex gap-3 items-center">
                        <RxDropdownMenu className="text-richblack-300" />
                        <p className="text-richblack-50 text-lg">{subsection.title}</p>
                      </div>
                      <div className="flex items-center gap-2" onClick={(e)=>e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() =>
                            setEditSubSection({
                              ...subsection,
                              sectionId: section._id,
                            })
                          }
                        >
                          <FaEdit className="text-richblack-300" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setConfirmationModal({
                              text1: "Delete this section",
                              text2:
                                "All the lectures in this section will be deleted",
                              btn1Text: "Delete",
                              btn2Text: "Cancel",
                              btn1Handler: () =>
                                handleDeleteSubSection(
                                  subsection._id,
                                  section._id
                                ),
                              btn2Handler: () => setConfirmationModal(null),
                            })
                          }
                        >
                          <RiDeleteBinFill className="text-richblack-300" />
                        </button>
                      </div>
                    </div>
                  );
                })}
                <button
                  onClick={() => setAddSubSection(section._id)}
                  className="text-yellow-50 flex gap-2 items-center  rounded-sm px-2 mt-1"
                >
                  <AiOutlinePlus />
                  <p>Add lecture</p>
                </button>
              </div>
            </details>
          );
        })}
      </div>
      {addSubSection ? (
        <SubsectionModal
          modalData={addSubSection}
          add={true}
          setModalData={setAddSubSection}
        />
      ) : viewSubSection ? (
        <SubsectionModal
          modalData={viewSubSection}
          view={true}
          setModalData={setViewSubSection} />
      ) : editSubSection ? (
        <SubsectionModal
          modalData={editSubSection}
          edit={true}
          setModalData={setEditSubSection} />
      ) : ( 
        <div></div>
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
