import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import { AiOutlineUpload } from "react-icons/ai";
import { updateDisplayPicture } from "../../../../services/operations/settingsOperation";
export default function ImageUpload() {
  const [profilePic, setProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const inputFile = useRef(null);
  const dispatch = useDispatch();
  function handleFileChange(e) {
    setProfilePic(e.target.files[0]);
    previewPhoto(e.target.files[0]);
  }
  function openFileUpload() {
    inputFile.current.click();
  }
  function uploadProfilePic() {
    const formData = new FormData();
    formData.append("displayPicture", profilePic);
    dispatch(updateDisplayPicture(formData, token, setLoading));
  }
  function upload() {
    uploadProfilePic();
  }
  function previewPhoto(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewPic(reader.result);
    };
  }
  return (
    <div className="flex items-center gap-4 border-[1px] border-richblack-700 px-4 py-2 md:py-6 rounded-md">
      <img
        className="w-[80px] h-[80px] rounded-full"
        src={previewPic || user?.image}
      />
      <div className="">
        <p className="text-richblack-5 mb-4 font-medium">
          Change profile picture
        </p>
        <div className="flex gap-x-2 ">
          <input
            type="file"
            id="file"
            name="file"
            className="hidden"
            ref={inputFile}
            onChange={handleFileChange}
          />
          <button
            className="bg-richblack-700 py-2 px-4 text-richblack-300 rounded-md"
            onClick={openFileUpload}
          >
            Select
          </button>

          <IconBtn
            text={`${loading ? "Uploading..." : "Upload"}`}
            onClick={upload}
          >
            <AiOutlineUpload />
          </IconBtn>
        </div>
      </div>
    </div>
  );
}
