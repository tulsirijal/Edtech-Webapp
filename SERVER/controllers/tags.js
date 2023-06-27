const Tags = require('../models/Tags');

exports.createTag = async(req,res)=>{
    try {
        const {name,description} = req.body;
        if(!name && !description){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            });
        }
        const tags = await Tags.create({name,description});
        console.log(tags)
        res.status(200).json({
            success:false,
            message:"Succcessfully created tags"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Cannot create tag",
            success:false
        });
    }
}

exports.getAllTags = async(req,res)=>{
    try {
        const allTags = await Tags.find({},{name:true,description:true});
        res.status(200).json({
            success:true,
            message:"All tags are returned",
            tags:allTags
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Cannot fetch the tags"
        });
    }
}