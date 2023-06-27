const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpEmailTemplate = require('../mail/emailVerification');
const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const response = await mailSender(
      email,
      "Verification Email from StudyNotion",
      otpEmailTemplate(otp)
    );
    console.log("Email sent successfully ", response);
  } catch (error) {
    console.log("error while sending email", error);
    throw error;
  }
}

OTPSchema.pre("save", async function(next) {
  
    if (this.isNew) {
      await sendVerificationEmail(this.email, this.otp);
    }
    next();
  
});

module.exports = mongoose.model("OTP", OTPSchema);
