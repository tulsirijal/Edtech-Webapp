import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BigPlayButton, Player } from "video-react";
import "video-react/dist/video-react.css";
import IconBtn from "../../../common/IconBtn";
import ReactPlayer from 'react-player'
export default function VideoDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId, sectionId, subSectionId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { entireCourseData, courseSectionData, completedLectures } =
    useSelector((state) => state.viewCourse);
  const videoPlayerRef = useRef(null);
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewSource, setPreviewSource] = useState("");

  function isFirstVideo() {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection?.findIndex((subsection) => subsection._id === subSectionId);
    if (currentSectionIndex === 0 && currentSubsectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  }
  function isLastVideo() {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection?.findIndex((subsection) => subsection._id === subSectionId);
    const noOfSUbSections =
      courseSectionData[currentSectionIndex]?.subSection?.length;
    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubsectionIndex === noOfSUbSections - 1
    ) {
      return true;
    } else {
      return false;
    }
  }
  function goToPrevVideo() {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subsection.findIndex((subsection) => subsection._id === subSectionId);
    const noOfSUbSections =
      courseSectionData[currentSectionIndex]?.subSection?.length;
    if (currentSubsectionIndex != 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection[
          currentSubsectionIndex - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      const prevSectionLength =
        courseSectionData[currentSectionIndex - 1]?.subSection?.length;
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          prevSectionLength - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  }
  function goToNextVideo() {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subsection.findIndex((subsection) => subsection._id === subSectionId);
    const noOfSUbSections =
      courseSectionData[currentSectionIndex]?.subSection?.length;
    if (currentSectionIndex !== noOfSUbSections - 1) {
      const nextSubSectionId =
        courseId[currentSectionIndex].subSection[currentSectionIndex + 1]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  }
  function handleLectureCompletion() {}

  useEffect(() => {
    function setVideoSpecificDetails() {
      if (!courseSectionData.length) {
        return;
      }
      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filteredData = courseSectionData?.filter(
          (section) => section?._id === sectionId
        );
        const filteredVideoData = filteredData?.[0]?.subSection?.filter(
          (subsection) => subsection?._id === subSectionId
        );
        if(filteredVideoData){
          setVideoData(filteredVideoData[0]);
        }
        setVideoEnded(false);
        setPreviewSource(entireCourseData?.thumbnail);
      }
    }
    setVideoSpecificDetails();
  }, [courseSectionData, entireCourseData, location.pathname]);

  return (
    <div className="flex flex-col text-white gap-5">
      {!videoData ? (
        <img src={previewSource} />
      ) :<>
      <ReactPlayer width='100%' height='100%' ref={videoPlayerRef} url={videoData?.videoUrl} playing={true} controls={true} onEnded={()=>setVideoEnded(true)} />
      {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  onClick={() => handleLectureCompletion()}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}
              <IconBtn
                onClick={() => {
                  if (videoPlayerRef?.current) {
                    // set the current time of the video to 0
                    videoPlayerRef?.current?.seekTo(0);
                    setVideoEnded(false);
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />
              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
      </>
      }
    </div>
  );
}
