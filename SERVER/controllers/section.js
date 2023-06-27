const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const newSection = await Section.create({ sectionName });
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { courseContent: newSection._id } },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    res.status(200).json({
      success: true,
      message: "Successfully created section",
      updateSection: updatedCourse,
    });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({
      success: false,
      message: "Unable to create section",
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName: sectionName },
      { new: true }
    );
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    res.status(200).json({
      success: true,
      message: "Section updated successfully",
      updateSection: course,
    });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({
      success: false,
      message: "Unable to update section",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;
    await Course.findByIdAndUpdate(courseId, {
      $pull: { courseContent: sectionId },
    });
    const section = await Section.findById(sectionId);
    // await SubSection.deleteMany({ _id: { $in: section.subSection } });
    console.log(section)
    await Section.findByIdAndDelete(sectionId);
    const course = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    }).exec();
    res.status(200).json({
      success: true,
      message: "Successfully deleted the section",
      data:course
    });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({
      success: false,
      message: "Unable to delete section",
    });
  }
};
