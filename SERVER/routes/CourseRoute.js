const express = require("express");
const router = express.Router();
// importing course controllers
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
  getFullCourseDetails,
} = require("../controllers/course");
// importing category controllers
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/category");
// importing section controllers
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/section");
// importing subsection controllers
const {
  createSubSection,
  updateSubSection,
  deleteSubsection,
} = require("../controllers/subsection");
// importing rating and reviews controllers
const {
  createRatings,
  getAverageRating,
  getAllRatingAndReview,
} = require("../controllers/ratingAndReviews");
// importing authentication middlewears
const { auth, isStudent, isTeacher,isAdmin } = require("../middlewears/authMiddlewear");

router.post("/createCourse", auth, isTeacher, createCourse);
router.post('/updateCourse',auth,isTeacher,editCourse)
router.post("/addSection", auth, isTeacher, createSection);
router.post("/updateSection", auth, isTeacher, updateSection);
router.delete("/deleteSection", auth, isTeacher, deleteSection);
router.post("/addSubSection", auth, isTeacher, createSubSection);
router.post("/updateSubSection", auth, isTeacher, updateSubSection);
router.delete("/deleteSubSection", auth, isTeacher, deleteSubsection);
router.get("/getAllCourses", getAllCourses);
router.post('/getFullCourseDetails',auth,getFullCourseDetails);
router.post("/getCourseDetails", getCourseDetails);
router.get("/getInstructorCourse",auth,isTeacher,getInstructorCourses);
router.delete('/deleteCourse',auth,isTeacher,deleteCourse)
// category can only be created by admin
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// rating and reviews
router.post('/createRating',auth,isStudent,createRatings);
router.get('/getAverageRating',getAverageRating);
router.get('/getReviews',getAllRatingAndReview);

module.exports = router
