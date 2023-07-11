import {toast} from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { courseEndPoints } from '../apis';

export const createCourse = async(data,token)=>{
  let result = null
 const toastId =  toast.loading("loading")
    try {
        const response = await apiConnector(
          "POST",
          courseEndPoints.CREATE_COURSE,
          data,
          {
            "Content-Type":"multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        );
        console.log(response.data.data);
        result = response.data.data
        toast.success("Successfully created")
      } catch (error) {
        console.log(error);
        toast.error("Unable to create")
      }
      toast.dismiss(toastId)
      return result;
}

export const updateCourse = async(data,token)=>{
    const toastId = toast.loading('Loading');
    let result = null;
    try {
        const response = await apiConnector('POST',courseEndPoints.UPDATE_COURSE,data,{
            "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${token}`
        });
        console.log(response.data.data);
        result = response.data.data
        toast.success("Successfully updated");
    } catch (error) {
        console.log(error);
        toast.error("Unablet to udpate");
    }
    toast.dismiss(toastId);
    return result
}

export const createSection = async(formData,token)=>{
  const toastId = toast.loading('Loading');
  let result = null;
  try {
    const response = await apiConnector('POST',courseEndPoints.CREATE_SECTION,formData,{
      
      Authorization:`Bearer ${token}`
    })
    console.log(response);
    result = response.data.updateSection
    console.log(response.data.updateSection)
  } catch (error) {
    console.log(error)
  }
  toast.dismiss(toastId);
  return result;
}

export const updateSection = async(formData,token)=>{
  const toastId = toast.loading("Loading");
  let result=null;
  try {
    const response = await apiConnector('POST',courseEndPoints.UPDATE_SECTION,formData,{
      Authorization:`Bearer ${token}`
    });
    // console.log(response.data.updateSection);
    result = response.data.updateSection

  } catch (error) {
    console.log(error)
  }
  toast.dismiss(toastId);
  return result
}

export const deleteSection = async(data,token)=>{
  const toastId = toast.loading('loading');
  let result = null;
  try {
    const response = await apiConnector('DELETE',courseEndPoints.DELETE_SECTION,data,{
      Authorization:`Bearer ${token}`
    });
    console.log(response.data);
    result = response.data.data
  } catch (error) {
    console.log(error)
  }
  toast.dismiss(toastId);
  return result
}

export const createSubSection = async(data,token)=>{
  const toastId  = toast.loading("loading");
  let result = null;
  try {
    const response = await apiConnector('POST',courseEndPoints.CREATE_SUBSECTION,data,{
      Authorization:`Bearer ${token}`
    })
    console.log(response.data);
    result = response.data.data
    toast.success(response.data.message);
  } catch (error) {
    console.log(error)
  }
  toast.dismiss(toastId)
  return result
}

export const updateSubSection = async(data,token)=>{
  const toastId = toast.loading('loading');
  let result = null;
  try {
    const response = await apiConnector('POST',courseEndPoints.UPDATE_SUBSECTION,data,{
      Authorization:`Bearer ${token}`
    });
    console.log(response);
    result = response.data.data
  } catch (error) {
    console.log(error)
  }
  toast.dismiss(toastId);
  return result
}

export const getFullCourseDetails = async(courseId,token)=>{
  const toastId = toast.loading("Loading");
  let result = null;
  try {
    const response = await apiConnector('POST',courseEndPoints.GET_FULL_COURSE_DETAILS,{courseId:courseId},{
      Authorization:`Bearer ${token}`
    });
    console.log(response.data.data.courseDetails);
    result = response.data.data
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result
}

export const deleteSubSection = async(data,token)=>{
  const toastId = toast.loading('loading');
  let result = null;
  try {
    const response = await apiConnector('DELETE',courseEndPoints.DELETE_SUBSECTION,data,{
      Authorization:`Bearer ${token}`
    });
    console.log(response);
    result = response.data.data
  } catch (error) {
    console.log(error)
  }
  toast.dismiss(toastId);
  return result
}

export const getInstructorCourses = async(token)=>{
  const toastId = toast.loading('Loading');
  let result = null
  try {
    const response = await apiConnector('GET', courseEndPoints.GET_INSTRUCTOR_COURSE,null,{
      Authorization:`Bearer ${token}`
    })
    console.log(response.data.data);
    result = response.data.data
  } catch (error) {
    console.log(error)
  }
  toast.dismiss(toastId);
  return result;
}

export const deleteCourse = async(courseId,token)=>{
  try {
    const response = await apiConnector('DELETE',courseEndPoints.DELETE_COURSE,courseId,{
      Authorization:`Bearer ${token}`
    });
    console.log(response.data);
    toast.success('Successfully deleted');
  } catch (error) {
    console.log(error)
    toast.error("Unable to delete");
  }
}

export const addRatingAndReview = async(data,token)=>{
  try {
    const response = await apiConnector('POST',courseEndPoints.CREATE_RATINGS,data,{
      Authorization:`Bearer ${token}`
    })
    if(response.data.success){
      toast.success("Added a review");
    }
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message);
  }
}

export const getAllReviews = async()=>{
  let result = null;
  try {
    const response = await apiConnector("GET",courseEndPoints.GET_REVIEWS);
    console.log(response.data.data)
    result = response?.data?.data
  } catch (error) {
    console.log(error.message)
  }
  return result
}