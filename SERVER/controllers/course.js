const Category = require("../models/Category");
const Course = require("../models/Course");
const Tags = require("../models/Tags");
const User = require("../models/User");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require('../models/CourseProgress')
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
exports.createCourse = async (req, res) => {
  try {
    let {
      name,
      price,
      description,
      whatYouWillLearn,
      category,
      tag,
      instructions,
      status,
    } = req.body;
    const { thumbnail } = req.files;
    if (
      !name ||
      !price ||
      !description ||
      !whatYouWillLearn ||
      !tag ||
      !category ||
      !thumbnail
    ) {
      return res.status(403).json({
        success: true,
        message: "All fields are required",
      });
    }
    if (!status || status == undefined) {
      status = "Draft";
    }
    const userID = req.user.id;
    const instructorDetails = await User.findById(userID, {
      accountType: "Teacher",
    });
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not found",
      });
    }
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Cannot find category",
      });
    }
    // upload thumbnail  to cloudinary
    const uploadImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.CLOUDINARY_FOLDER
    );
    const newCourse = await Course.create({
      name,
      price,
      description,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      instructions: instructions,
      thumbnail: uploadImage.secure_url,
      status: status,
    });

    // add the new course to the user schema of instructor
    await User.findByIdAndUpdate(
      instructorDetails._id,
      { $push: { courses: newCourse._id } },
      { new: true }
    );
    // update tags schema
    await Category.findByIdAndUpdate(
      category,
      { $push: { courses: newCourse._id } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

// getAllCourses

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      { status: "Published" },
      {
        name: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();
    res.status(200).json({
      success: true,
      message: "Here are all the courses",
      courses: allCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get the courses",
    });
  }
};

// get all course details
exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalInfo",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .exec();
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Couldn't find the course with the ${courseId}`,
      });
    }
    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
    res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: {
        courseDetails: courseDetails,
        timeDuration: totalDuration,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// edit course
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const {
      name,
      price,
      description,
      whatYouWillLearn,
      category,
      tag,
      instructions,
      status,
    } = req.body;
    const course = await Course.findById(courseId);
    if (req.files) {
      const thumbnail = req.files.thumbnail;
      const thumbnailImg = await uploadImageToCloudinary(
        thumbnail,
        process.env.CLOUDINARY_FOLDER
      );
      course.thumbnail = thumbnailImg.secure_url;
    }
    if (name !== undefined) {
      course.name = name;
    }
    if (price !== undefined) {
      course.price = price;
    }
    if (description !== undefined) {
      course.description = description;
    }
    if (whatYouWillLearn !== undefined) {
      course.whatYouWillLearn = whatYouWillLearn;
    }
    if (category !== undefined) {
      course.category = category;
    }
    if (tag !== undefined) {
      course.tag = tag;
    }
    if (instructions !== undefined) {
      course.instructions = instructions;
    }
    if (status !== undefined) {
      course.status = status;
    }
    await course.save();
    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalInfo",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    res.status(200).json({
      message: "successfully updated the course",
      success: true,
      data: updatedCourse,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;
    const courseDetails = await Course.findOne({_id:courseId}).populate({
      path: "instructor",
      populate: {
        path: "additionalInfo",
      },
    }).populate('category').populate('ratingAndReviews').populate({path:"courseContent",populate:{
      path:"subSection"
    }}).exec();
    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })
    if(!courseDetails){
      return res.status(404).json({
        success:false,
        message:`Couldn't find the course with ${courseId} id`
      })
    }
    res.status(200).json({
      success:true,
      data:{
        courseDetails,
        completedVideos: courseProgressCount?.completedVideos
        ? courseProgressCount?.completedVideos
        : [],
      }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const intructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: intructorCourses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unable to fetch the courses",
      success: "false",
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({
        success: false,
        message: "Course doesnt exist",
      });
    }
    // Delete the sections and subsections of the course
    const courseSections = course.courseContent;
    for (const sectionId of courseSections) {
      const section = await Section.findById(sectionId);
      if (section) {
        const subSections = section.subSection;
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId);
        }
      }
      await Section.findByIdAndDelete(sectionId);
    }
    await Course.findByIdAndDelete(courseId);
    res.status(200).json({
      success: true,
      message: "Successfully deleted the course",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "unable to delete the course",
    });
  }
};
