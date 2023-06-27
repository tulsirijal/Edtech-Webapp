import React, { useEffect, useState } from "react";
import ContactUsForm from "../../contactPage/ContactUsForm";

export default function ContactForm() {

  return (
    <div className="w-11/12 max-w-[450px] mx-auto flex flex-col gap-y-2 ">
      <h1 className="font-bold text-2xl lg:text-4xl text-richblack-5 text-center">
        Get in Touch
      </h1>
      <p className="font-semibold text-richblack-300 text-center mb-3">
        We'd love to here for you, Please fill out this form.
      </p>
      <ContactUsForm />
    </div>
  );
}
