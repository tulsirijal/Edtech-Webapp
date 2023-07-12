require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const mongoose = require("mongoose");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/courseEnrollment");
exports.stripePayment = async (req, res) => {
  try {
    const { courses } = req.body;
    const userId = req.user.id;
    let totalAmount = 0;
    let courseUserWantsToBuy = [];
    for (const courseId of courses) {
      let course;
      try {
        course = await Course.findById(courseId);
        courseUserWantsToBuy.push(course);
        if (!course) {
          return res
            .status(404)
            .json({ success: false, message: "Could not find the course" });
        }
        const user_Id = new mongoose.Types.ObjectId(userId);
        console.log(user_Id);
        if (course.studentEnrolled.includes(user_Id)) {
          return res.status(403).json({
            success: false,
            message: "User is already enrolled",
          });
        }
        totalAmount += course.price;
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
      }
    }
    const line_items = courseUserWantsToBuy.map((course) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: course.name,
          },
          unit_amount: course.price * 100,
        },
        quantity: 1,
      };
    });
    const customer = await stripe.customers.create({
      metadata: {
        userId: userId,
        coursesId: JSON.stringify(courses),
      },
    });
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items: line_items,
      mode: "payment",
      success_url: "https://learnprogramming-lilac.vercel.app/dashboard/enrolled-courses",
      cancel_url: "https://learnprogramming-lilac.vercel.app/cancel",
    });
    res.status(200).json({
      success: true,
      session: session,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Cannot initiate the payment",
    });
  }
};

// webhook

exports.webhook = async (request, response) => {
  const endpointSecret = process.env.ENDPOINT_SECRET;
  const sig = request.headers["stripe-signature"];

  let event;
  let data;
  let eventType;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log("webhook verified");
    data = event.data.object;
    eventType = event.type;
    // console.log("DATA...", data);
    // console.log("eventType...", eventType);
  } catch (err) {
    // console.log(err.message);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  if (event.type === "checkout.session.completed") {
    console.log("payment successfull");
    try {
      const customer = await stripe.customers.retrieve(data.customer);
      // console.log(customer.metadata.userId);
      // console.log(JSON.parse(customer.metadata.coursesId));
      const userId = customer.metadata.userId;
      const coursesId = JSON.parse(customer.metadata.coursesId);
      for (const courseId of coursesId) {
        try {
          const enrolledCourse = await Course.findByIdAndUpdate(
            courseId,
            { $push: { studentEnrolled: userId } },
            { new: true }
          );
          const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            { $push: { courses: courseId } },
            { new: true }
          );
          await mailSender(
            enrolledStudent.email,
            `Successfully enrolled into ${enrolledCourse.name}`,
            courseEnrollmentEmail(
              enrolledCourse.name,
              enrolledStudent.firstName
            )
          );
        } catch (error) {
          // console.log(error.message);
        }
      }
    } catch (error) {
      // console.log(error);
    }

    response.status(200).end();
  }
};
