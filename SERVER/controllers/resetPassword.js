const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
exports.resetPasswordToken = async(req,res)=>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Cannot find the id with that email"
            })
        }
        const token = crypto.randomUUID();
        const updatedDetails = await User.findOneAndUpdate({email},{
            token:token,
            resetPasswordToken:Date.now() + 5 * 60 * 1000
        },{new:true})
        const url = `http:localhost:5173/update-password/${token}`
        await mailSender(email,"Password reset link",`This is the link to reset the password ${url}`)
        return res.status(200).json({
            success:true,
            message:"Successfully sent the link to reset the password",
            url:url
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Cannot send the password reset link"
        })
    }
}
exports.resetPassword = async(req,res)=>{
    try {
        const {password , confirmPassword,token} = req.body;
        if(password !== confirmPassword){
            return res.status(403).json({
                success:false,
                message:"Passwords do not match"
            })
        }
        const user = await User.findOne({token});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User doesnt exist"
            })
        }
        if(user.resetPasswordExpires < Date.now()){
            return res.status(403).json({
                success:false,
                message:"The link has been expired"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        await User.findOneAndUpdate({token},{
            password:hashedPassword,
            confirmPassword:hashedPassword
        },{new:true})
        return res.status(200).json({
            success:true,
            message:"Successfully reset the password"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Unable to reset the password"
        })
    }
}