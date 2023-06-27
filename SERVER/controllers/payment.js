require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const { default: mongoose } = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
exports.stripePayment = async(req,res)=>{
    try {
        const {courseId} = req.body;
        const userId = req.user.id;
        let courseDetails;
        try {
            courseDetails = await Course.findById(courseId);
            if(!courseDetails){
                return res.status(403).json({
                    success:false,
                    message:"Cannot find the course"
                })
            }
            // check if the user already exists
            const userIdInDB = new mongoose.Types.ObjectId(userId);
            if(courseDetails.studentEnrolled.includes(userIdInDB)){
                return res.status(403).json({
                    success:false,
                    message:"You have already bought the course"
                })
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message:'Unable to get the course'
            })
        }
        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: Course.name,
                  },
                  unit_amount: courseDetails.price * 100,
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: 'http://localhost:4242/success',
            cancel_url: 'http://localhost:4242/cancel',
          });
        res.status(200).json({
            success:true,
            session:session,
            
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Cannot initiate the payment"
        })
    }
}