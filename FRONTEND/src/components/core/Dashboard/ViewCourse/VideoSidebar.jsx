import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";
import IconBtn from "../../../common/IconBtn";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
export default function VideoSidebar({ setReviewModal }) {
  const {
    courseSectionData,
    entireCourseData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);
  const [activeSection, setActiveSection] = useState("");
  const [activeVideoBar, setActiveVideoBar] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  useEffect(() => {
    function setActiveFlags() {
      if (!courseSectionData.length) {
        return;
      }
      const currentSectionIndex = courseSectionData.findIndex(
        (section) => section._id === sectionId
      );
      const currentSubsectionIndex = courseSectionData[
        currentSectionIndex
      ]?.subSection?.findIndex((subsection) => subsection._id === subSectionId);
      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection[
          currentSubsectionIndex
        ]?._id;
      setActiveSection(courseSectionData[currentSectionIndex]?._id);
      setActiveVideoBar(activeSubSectionId);
    }
    setActiveFlags();
  }, [courseSectionData, entireCourseData, location.pathname]);
  function handleShowModal() {
    setReviewModal(true);
  }
  function handleAddReview() {}
  return (
    <div className="md:h-[calc(100vh-3rem)] mx-auto md:mx-0 mt-10 w-full md:mt-0 mb-10 md:mb-0 md:max-w-[250px] bg-richblack-800">
      <div className="flex items-center justify-between px-2 py-2">
        <div
          className=""
          onClick={() => navigate("/dashboard/enrolled-courses")}
        >
          <MdOutlineArrowBack className="text-2xl h-10 w-10 bg-richblack-800 rounded-md text-richblack-300" />
        </div>
        <IconBtn text="Add Review" onClick={() => setReviewModal(true)} />
      </div>
      <div className="px-2">
        <p className="text-richblack-5">{entireCourseData?.name}</p>
        <p className="text-sm font-semibold text-richblack-500">
          {completedLectures.length}/{totalNoOfLectures}
        </p>
      </div>
      <div>
        {courseSectionData.map((section, index) => {
          return (
            <div onClick={() => setActiveSection(section?._id)} key={index}>
              <div className="bg-richblack-700 ">
                <div className="flex items-center justify-between px-4 py-2">
                  <p className="text-richblack-5">{section.sectionName}</p>
                  {activeSection ? (
                    <RiArrowDropDownLine className="text-richblack-300 text-4xl" />
                  ) : (
                    <RiArrowDropUpLine className="text-richblack-300 text-4xl" />
                  )}
                </div>
                <div>
                  {activeSection === section._id && (
                    <div className="transition-[height] duration-500 ease-in-out">
                      {section.subSection.map((subsection, index) => {
                        return (
                          <div
                            key={index}
                            className={`flex items-center justify-between px-5 py-2 ${
                              activeVideoBar === subsection._id
                                ? "bg-yellow-50 text-black"
                                : "bg-richblack-800 text-richblack-5"
                            }`}
                            onClick={() => {
                              navigate(
                                `/view-course/${entireCourseData._id}/section/${section._id}/sub-section/${subsection._id}`
                              );
                              setActiveVideoBar(subsection);
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={completedLectures.includes(
                                subsection._id
                              )}
                              onChange={() => {}}
                            />
                            <p className="">{subsection.title}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
