
const Section = require("../models/Section");
const Subsection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    const { video } = req.files;
    if (!sectionId || !title  || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.CLOUDINARY_FOLDER
    );
    const SubsectionDetails = await Subsection.create({
      title,
      timeDuration:`${uploadDetails.duration}`,
      description,
      videoUrl: uploadDetails.secure_url,
    });
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subSection: SubsectionDetails._id } },
      { new: true }
    ).populate("subSection");
    res.status(200).json({
      success: true,
      message: "Successfully created subsection",
      data:updatedSection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create subsection",
    });
  }
};

// update subsection
exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId,subSectionId, title, description } = req.body;
    const subSection = await Subsection.findById(subSectionId);
    if(title!==undefined){
      subSection.title = title
    }
    if(description !==undefined){
      subSection.description = description
    }
    if(req.files && req.files.video !==undefined){
      const {video} = req.files;
      const uploadDetails = await uploadImageToCloudinary(video,process.env.CLOUDINARY_FOLDER);
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = uploadDetails.duration;
    }
    await subSection.save();
    const updatedSection = await Section.findById(sectionId).populate("subSection")
    res.status(200).json({
        success: true,
        message: "Successfully updated subsection",
        data:updatedSection,
      });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Unable to update subsection", error,
      });
  }
};
// delete subsection
exports.deleteSubsection = async(req,res)=>{
    try {
        const {subSectionId,sectionId} = req.body;
        await Subsection.findByIdAndDelete(subSectionId);
        await Section.findByIdAndUpdate(sectionId,{$pull:{subSection:subSectionId}});
        const updatedSection = await Section.findById(sectionId).populate('subSection')
        res.status(200).json({
            success:true,
            data:updatedSection,
            message:"Successfully deleted the subsection"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Unable to delete the subsection"
        })
    }
}