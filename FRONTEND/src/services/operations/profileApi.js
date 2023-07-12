import React from "react";
import { apiConnector } from "../apiConnector";
import { userDetails } from "../apis";
import { toast } from "react-hot-toast";
export async function userEnrolledCourses(token) {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      userDetails.ENROLLED_COURSES,
      null,
      { Authorization: `Bearer ${token}` }
    );
    console.log(response.data.data);
    result = response.data.data;
  } catch (error) {
    console.log(error);
  }
  return result;
}

export async function getInstructorData(token) {
  let result = null;

  try {
    const response = await apiConnector(
      "GET",
      userDetails.GET_INSTRUCTOR_DATA,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log(response.data.data);
    result = response.data.data;
  } catch (error) {
    console.log(error);
  }
  return result;
}
