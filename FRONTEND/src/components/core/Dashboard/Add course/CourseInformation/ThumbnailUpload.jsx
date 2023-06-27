import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import {FiUploadCloud} from 'react-icons/fi';
import 'video-react/dist/video-react.css';
import { Player } from 'video-react'
export default function ThumbnailUpload({
  name,
  label,
  register,
  setValue,
  getValues,
  errors,
  viewData = null,
  video = false,
  editData = null,
}) {
  const inputRef = useRef();
  const [previewFile, setPreviewFile] = useState(viewData ? viewData : editData ? editData : "")
  const [thumbnailImg, setThumbnailImg] = useState("");
  function handlePreviewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
   reader.onloadend = () => {
      setPreviewFile(reader.result);
    };
  }

  function onDrop(acceptedFiles) {
    const file = acceptedFiles[0];
    if (file) {
      handlePreviewFile(file);
      setThumbnailImg(file);
    }
  }
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  });
  useEffect(()=>{
    register(name,{required:true});
  },[register]);
  useEffect(()=>{
    setValue(name,thumbnailImg);
  },[thumbnailImg,setValue])
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        {previewFile ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewFile}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <Player aspectRatio="16:9" playsInline src={previewFile} />
            )}
            {!viewData && (
              <button
                
                onClick={() => {
                  setPreviewFile("")
                  setThumbnailImg(null)
                  setValue(name, null)
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col items-center p-6"
            {...getRootProps()}
          >
            <input {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="text-sm text-yellow-300">
          {label} is required
        </span>
      )}
    </div>
  );
}
