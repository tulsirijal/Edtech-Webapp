import React from "react"

import Footer from "../components/core/homePage/Footer"
import ContactDetails from "../components/contactPage/ContactDetails"
import ContactForm from "../components/core/AboutPage/ContactFormSection"
import ReviewSlider from "../components/common/ReviewSlider"

const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-20 mb-10 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact