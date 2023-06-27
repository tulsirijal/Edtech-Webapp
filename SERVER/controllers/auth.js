const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require('dotenv').config()
// send otp to the user

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const userCheck = await User.findOne({ email });
    if (userCheck) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }
    // generate otp
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("otp is ", otp);
    const result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpBody = await OTP.create({email:email,otp:otp});
    console.log(otpBody);
    res.status(200).json({
      success: true,
      message: "Successfully sent the otp",
      otp:otp
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// sign up

exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (password != confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password do not match",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with that email",
      });
    }
    // finding otp
    const recentOtp = await OTP.findOne({ email:email })
      .sort({ createdAt: -1 })
      .limit(1);
      console.log(recentOtp)
   if (otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "OTP do not match",
      });
    }

    // hasing the passowrd
    const hashedPassword = await bcrypt.hash(password, 10);
    const profileDetails = await Profile.create({
      gender: null,
      DOB: null,
      phoneNumber: null,
      profession: null,
      about:null
    });
    const user = await User.create({
      firstName,
      lastName,
      email,
      password:hashedPassword,
      confirmPassword:hashedPassword,
      accountType,
      additionalInfo: profileDetails._id,
      image: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      data:user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to register the user",
      
    });
  }
};

// login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await User.findOne({ email }).populate("additionalInfo");
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "You need to sign up first",
      });
    }
    // compare password if the user exists
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        accountType: user.accountType,
        id: user._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;

      // create and send cookie to the client
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      return res.cookie("token", token, options).status(200).json({
        success: true,
        message: "Successfully logged in",
        token: token,
        user:user
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (error) {
    console.log(error);
    res.satus(500).json({
      success: false,
      message: "Unable to login",
    });
  }
};

exports.changePassword = async(req,res)=>{
    try {
       const {password,newPassword} = req.body
        const email = req.user.email;
        // check if the user exists or not
        const user = await User.findOne({email});
        if(!user){
          return res.status(401).json({
            success:false,
            message:"You cannot change the password"
          })
        }
        // verify if the old password matches with the password in the db
        if(bcrypt.compare(password,user.password)){
          const hashedPassword = bcrypt.hash(newPassword,10)
          await User.findOneAndUpdate({email},{password:hashedPassword,confirmPassword:hashedPassword})
        } else {
          return res.status(400).json({
            success:false,
            message:"The old password is incorrect"
          })
        }
        res.status(200).json({
          success:true,
          message:"Successfully changed the password"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
          success:false,
          message:"Unable to reset the password"
        })
    }
}
