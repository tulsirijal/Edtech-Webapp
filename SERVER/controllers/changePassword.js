const User = require('../models/User');
const bcrypt = require('bcrypt');
const mailsender = require('../utils/mailSender');
const { passwordUpdated } = require('../mail/passwordUpdate');
exports.changePassword = async(req,res)=>{
    try {
        // get the user id from the jwt token
        const id = req.user.id;
        const user = await User.findById(id)
        // get the old password and new password from user
        const {oldPassword,newPassword} = req.body;
        // validate the fields 
        if(!oldPassword || !newPassword){
            return res.status(400).json({
                success:false,
                message:"Both fields are required"
            })
        }
        // check if the old password is correct or not
        if(await bcrypt.compare(oldPassword,user.password)){
            let hashedPassword = await bcrypt.hash(newPassword,10);
            await User.findByIdAndUpdate(id,{password:hashedPassword,confirmPassword:hashedPassword});
            await mailsender(user.email,"PASSWORD CHANGED",passwordUpdated(user.email,user.firstName));
        } else {
            return res.status(403).json({
                success:false,
                message:"Old password is incorrect"
            })
        }
        res.status(200).json({
            success:true,
            message:"Password has been updated successfully",
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Unable to change the password"
        })
    }
}