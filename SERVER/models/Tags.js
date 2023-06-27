const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Tags",TagSchema)