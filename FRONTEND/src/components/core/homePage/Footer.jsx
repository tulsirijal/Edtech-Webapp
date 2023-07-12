import React from "react";
import { FooterLink2 } from "../../../data/footer-links";
import { FaFacebook } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import CompanyLogo from "../../../assets/Logo/Logo-Full-Light.png";
import {Link} from 'react-router-dom'
export default function Footer() {
  const date = new Date();
  const foooterDate= date.getFullYear()
  const resources = [
    "Articles",
    "Blog",
    "Chart sheet",
    "Code Challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces",
  ];
  const company = ["About", "Careers", "Affiliates"];
  const plans = ["Paid Memberships", "For students", "Business solutions"];
  const community = ["Forums", "Chapters", "Events"];
  return (
    <div className="bg-richblack-800">
      <div className="w-11/12 max-w-maxContent mx-auto pt-10 flex flex-col lg:flex-row gap-20">
        {/* left side div */}
        <div className="flex flex-wrap lg:flex-row gap-7 md:gap-12 md:py-5 md:pr-14 lg:border-r-[0.5px] border-richblack-300">
          {/* About company */}
          <div className="flex flex-col gap-2">
            <img src={CompanyLogo} />
            <h3 className="font-semibold text-[16px] text-richblack-50">Company</h3>
            {company.map((element, index) => {
              return (
                <p
                  className="text-[14px] hover:text-richblack-5 transition-all duration-200 cursor-pointer text-richblack-300"
                  key={index}
                >
                  {element}
                </p>
              );
            })}
            <div className="flex gap-2 text-richblack-300">
              <FaFacebook />
              <AiFillYoutube />
              <AiOutlineInstagram />
              <AiOutlineTwitter />
            </div>
          </div>
          {/* Resources and support */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-[16px] text-richblack-50">Resources</h3>
            {resources.map((element, index) => {
              return (
                <p
                  key={index}
                  className=" text-[14px] hover:text-richblack-5 transition-all duration-200 cursor-pointer text-richblack-300"
                >
                  {element}
                </p>
              );
            })}
            <div>
              <h3 className="font-semibold text-[16px] text-richblack-50 mt-5">Support</h3>
              <p className=" text-[14px] hover:text-richblack-5 transition-all duration-200 cursor-pointer text-richblack-300">
                Help center
              </p>
            </div>
          </div>
          {/* plans and community */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-[16px] text-richblack-50">Plans</h3>
            {
                plans.map((element,index)=>{
                    return <p key={index} className="text-[14px] hover:text-richblack-5 transition-all duration-200 cursor-pointer text-richblack-300">{element}</p>
                })
            }
            <div className="flex flex-col mt-2">
                <h3 className="font-semibold text-[16px] text-richblack-50">Community</h3>
                {
                    community.map((element,index)=>{
                        return <p key={index} className="text-[14px] hover:text-richblack-5 transition-all duration-200 cursor-pointer text-richblack-300">{element}</p>
                    })
                }
            </div>
          </div>
        </div>
        {/* right side div */}
        <div className="flex flex-wrap lg:flex-row md:py-5 gap-20">
            {
                FooterLink2.map((element,index)=>{
                    return <div key={index} className="flex flex-col gap-2">
                        <h3 className="font-semibold text-[16px] text-richblack-50">{element.title}</h3>
                        {element.links.map((item,index)=>{
                            return <p key={index} className="text-[14px] hover:text-richblack-5 transition-all duration-200 cursor-pointer text-richblack-300">{item.title}</p>
                        })}
                    </div>
                })
            }
        </div>
      </div>
      {/* last part of the footer */}
      <div className="border-t-[1px] border-richblack-300 w-11/12 max-w-maxContent mx-auto mt-5 py-5">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="flex gap-2 py-4 lg:py-8">
              <Link to='/about'>
                <p className="text-[14px] border-r-[1px] pr-2 hover:text-richblack-5 transition-all duration-200 cursor-pointer text-richblack-300">About us</p>
              </Link>
              <Link to='/contact'>
                <p className="text-[14px] border-r-[1px] pr-2 hover:text-richblack-5 transition-all duration-200 cursor-pointer text-richblack-300">Contact us</p>
              </Link>
              <p className="text-[14px] hover:text-richblack-5 transition-all duration-200 cursor-pointer text-richblack-300">Terms</p>
            </div>
            <div className=" hover:text-richblack-5 transition-all duration-200 cursor-pointer text-richblack-300">
              Made with ❤️ Tulsi © {foooterDate}
            </div>
        </div>
      </div>
    </div>
  );
}
