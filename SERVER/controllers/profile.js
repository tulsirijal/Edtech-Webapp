const User = require("../models/User");
const Profile = require("../models/Profile");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const { gender, DOB, profession, phoneNumber, about } = req.body;
    if (!gender || !phoneNumber) {
      return res.status({
        success: false,
        message: "All fields are required",
      });
    }
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalInfo;
    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId,
      {
        gender: gender,
        DOB: DOB,
        profession: profession,
        phoneNumber: phoneNumber,
        about: about,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated the profile",
      updatedProfile: updatedProfile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update profile",
    });
  }
};

// how to schedule the account deletion
exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalInfo;
    await Profile.findByIdAndDelete(profileId);
    await User.findByIdAndDelete(id);
    // todo-> remove from enrolled courses
    res.status(200).json({
      success: true,
      message: "Successfully deleted the account",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete account",
    });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalInfo")
      .exec();
    res.status(200).json({
      success: true,
      message: "Here are the user details",
      userDetails: userDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get user details",
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const id = req.user.id;
    const displayPicture = req.files.displayPicture;
    const imageUpload = await uploadImageToCloudinary(
      displayPicture,
      process.env.CLOUDINARY_FOLDER,
      1000,
      1000
    );
    console.log(imageUpload);
    const updatedDisplayPicture = await User.findByIdAndUpdate(
      id,
      { image: imageUpload.secure_url },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated the display picture",
      data: updatedDisplayPicture,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Unable to update the display picture",
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id });
    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentEnrolled.length;
      const totalAmount = totalStudentsEnrolled * course.price;
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.name,
        description: course.description,
        totalStudentsEnrolled: totalStudentsEnrolled,
        totalAmount: totalAmount,
      };
      return courseDataWithStats;
    });
    res.status(200).json({ data: courseData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
