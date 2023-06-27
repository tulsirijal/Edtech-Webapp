const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  whatYouWillLearn: {
    type: String,
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReviews",
    },
  ],
  price: { 
    type: Number,
  },
  thumbnail: {
    type: String,
  },
  tag: {
    type: [String],
    required:true,
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category'
  },
  studentEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  instructions:{
    type:[String]
  },
  status:{
    type:String,
    enum:["Draft","Published"]
  }
},{timestamps:true});

module.exports = mongoose.model("Course", CourseSchema);
