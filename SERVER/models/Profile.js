const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    gender:{
        type:String,
    },
    DOB:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    profession:{
        type:String
    },
    about:{
        type:String
    }

})
module.exports = mongoose.model('Profile',ProfileSchema)