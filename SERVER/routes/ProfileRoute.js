const express = require("express");
const router = express.Router();
const { auth } = require("../middlewears/authMiddlewear");
const {
  updateProfile,
  deleteAccount,
  getUserData,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controllers/profile");

router.delete("/deleteAccount", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getUserData);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get('/getEnrolledCourses',auth,getEnrolledCourses);
router.get('/getInstructorData',auth,instructorDashboard);
module.exports = router;
