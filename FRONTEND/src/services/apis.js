const BASE_URL = import.meta.env.VITE_BASE_URL;
export const categories = {
    CATEGORIES_API:BASE_URL + "/course/showAllCategories",
}
export const sendOtpApi = {
    SEND_OTP_API:BASE_URL + "/auth/sendOTP"
}
export const resetPasswordToken = {
    RESET_TOKEN:BASE_URL + "/auth/reset-password-token"
}
export const resetPasswordLink = {
    RESET_PASSWORD:BASE_URL + "/auth/reset-password"
}
export const authEndPoints = {
    LOGIN:BASE_URL + '/auth/login',
    SIGNUP:BASE_URL + '/auth/signup',
    UPDATE_PASSWORD:BASE_URL + '/auth/changePassword'
}
export const contactUs={
    CONTACT_US:BASE_URL + '/contact-us'
}
export const userDetails = {
    ENROLLED_COURSES:BASE_URL + '/profile/getEnrolledCourses',
    UPDATE_PROFILE_PICTURE:BASE_URL + '/profile/updateDisplayPicture',
    GET_USER_DETAILS: BASE_URL + '/profile/getUserDetails',
    UPDATE_ADDITIONAL_INFO: BASE_URL + '/profile/updateProfile',
    DELETE_ACCOUNT:BASE_URL + '/profile/deleteAccount'
}
export const courseEndPoints = {
    GET_CATEGORY:BASE_URL + '/course/showAllCategories',
    CREATE_COURSE:BASE_URL + '/course/createCourse',
    UPDATE_COURSE:BASE_URL + '/course/updateCourse',
    DELETE_COURSE:BASE_URL + '/course/deleteCourse',
    CREATE_SECTION:BASE_URL + '/course/addSection',
    UPDATE_SECTION:BASE_URL + '/course/updateSection',
    DELETE_SECTION:BASE_URL + '/course/deleteSection',
    DELETE_SUBSECTION:BASE_URL + '/course/deleteSubSection',
    CREATE_SUBSECTION:BASE_URL + '/course/addSubSection',
    UPDATE_SUBSECTION:BASE_URL + '/course/updateSubSection',
    DELETE_SUBSECTION:BASE_URL + '/course/deleteSubSection',
    GET_INSTRUCTOR_COURSE:BASE_URL + '/course/getInstructorCourse',
    GET_FULL_COURSE_DETAILS:BASE_URL + '/course/getFullCourseDetails'
}