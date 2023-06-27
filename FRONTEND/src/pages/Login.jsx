import React from "react";
import Template from "../components/core/Auth/Template";
import frame from '../assets/Images/frame.png'
import loginImage from '../assets/Images/login.webp'
export default function Login() {
  return (
    <Template
      heading={"Welcome Back"}
      description1={"Build skills for today, tomorrow, and beyond."}
      description2={"Education to future-proof your career."}
      formType={"login"}
      frame={frame}
      image={loginImage}
    />
  );
}
