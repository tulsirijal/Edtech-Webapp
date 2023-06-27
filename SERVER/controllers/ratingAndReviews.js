const RatingAndReview = require('../models/RatingAndReviews');
const Course = require('../models/Course');
const { default: mongoose } = require('mongoose');

// create ratings
exports.createRatings = async(req,res)=>{
    try {
        const userId = req.user.id;
        const {rating,reviews,courseId} = req.body;
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId
        })
        if(alreadyReviewed){
            return res.status(404).json({
                success:false,
                message:"Already reviewed the course"
            })
        }
        const ratingReview = await RatingAndReview.create({
            rating,reviews,
            course:courseId,
            user:userId
        })
        await Course.findByIdAndUpdate(courseId,{$push:{ratingAndReviews:ratingReview._id}},{new:true});
        res.status(200).json({
            success:true,
            message:"Rating and review successfull",
            data:ratingReview
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success:false,
            message:"Unable to give  rating and reviews"
        })
    }
}

// get average ratings
exports.getAverageRating = async(req,res)=>{
    try {
        const {courseId} = req.body;
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId )
                }
            },{
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating "}
                }
            }
        ])
        if(result.length >0){
            return res.status(200).json({
                success:true,
               averageRating:result[0].averageRating
            })
        } 
        res.status(200).json({
            success:true,
            averageRating:0
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"unable to get the average ratings"
        })
    }
}

// get all ratings
exports.getAllRatingAndReview = async(req,res)=>{
    try {
        const allRatingAndReviews = await RatingAndReview.find().sort({rating:"desc"}).populate({
            path:"user",
            select:"firstName lastName image email"
        }).populate({
            path:'course',
            select:"name"
        }).exec()
        res.status(200).json({
            success:true,
            data:allRatingAndReviews
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Unable to get rating and reviews" 
        })
    }
}