import {combineReducers} from '@reduxjs/toolkit';
import authSlice from '../slices/authSlice';
import cartSlice from '../slices/cartSlice';
import courseSlice from '../slices/courseSlice';
import profileSlice from '../slices/profileSlice';
import viewCourseSlice from '../slices/viewCourseSlice';
const rootReducer = combineReducers({
    auth:authSlice,
    cart:cartSlice,
    profile:profileSlice ,
    course:courseSlice,
    viewCourse:viewCourseSlice
})
export default rootReducer