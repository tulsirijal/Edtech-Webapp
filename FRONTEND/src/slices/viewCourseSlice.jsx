import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  courseSectionData: [],
  entireCourseData: [],
  totalNoOfLectures: 0,
  completedLectures: [],
};

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, actions) => {
      state.courseSectionData = actions.payload;
    },
    setEntireCourseData: (state, actions) => {
      state.entireCourseData = actions.payload;
    },
    setCompletedLectures: (state, actions) => {
      state.completedLectures = actions.payload;
    },
    setTotalNoOfLectures: (state, actions) => {
      state.totalNoOfLectures = actions.payload;
    },
    updateCompletedLectures: (state, actions) => {
      state.completedLectures = [...state.completedLectures, actions.payload];
    },
  },
});
export const {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  updateCompletedLectures,
} = viewCourseSlice.actions;
export default viewCourseSlice.reducer;
