import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/homePage/HighlightText";
import CTAbutton from "../components/core/homePage/CTAbutton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/homePage/CodeBlocks";
import TimelineSection from "../components/core/homePage/TimelineSection";
import LearnLanguage from "../components/core/homePage/learnLanguage";
import InstructionSection from "../components/core/homePage/InstructionSection";
import ExploreCourses from "../components/core/homePage/ExploreCourses";
import Footer from "../components/core/homePage/Footer";
export default function Home() {
  return (
    <div>
      {/* section -1 */}
      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
        <Link to="/signup">
          <div className="group mt-16 p-1 rounded-full bg-richblack-800 font-bold text-richblack-200 z-0 transition-all duration-200 w-fit hover:scale-95">
            <button className="flex items-center rounded-full gap-[10px] px-10 py-2 transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an instructor</p>
              <FaArrowRight />
            </button>
          </div>
        </Link>
        <div className="text-center text-4xl font-semibold mt-7  ">
          Empower Your Future with <HighlightText text={"Coding Skills"} />
        </div>
        <p className="w-[90%]   mt-4 text-center text-lg font-bold text-richblack-300 ">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </p>
        <div className="flex gap-3 my-7">
          <CTAbutton active={true} linkto={"/signup"}>
            Learn more
          </CTAbutton>
          <CTAbutton active={false} linkto={"/login"}>
            Book a demo
          </CTAbutton>
        </div>
        <div
          className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200"
        >
          <video loop muted autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
        {/* CODE SECTION -1 */}
        <div className="mx-auto">
          <CodeBlocks
            position={"md:flex-row flex flex-col"}
            heading={
              <div className="text-4xl  font-bold">
                Unlock your <HighlightText text={"coding potential "} />
                with our online courses.
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctaBtn1={{
              btnText: "Try it yourself",
              active: true,
              linkto: "/signup",
            }}
            ctaBtn2={{ btnText: "Learn more", active: false, linkto: "/login" }}
            codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one/">One</a></nav>\n</body>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={"codeblock1"}
          />
        </div>
        {/* CODE SECTION 2 */}
        <div>
          <CodeBlocks
            position={"md:flex-row-reverse flex flex-col"}
            heading={
              <div className="text-4xl font-bold w-[100%] lg:w-[50%]">
                Start <HighlightText text={"Coding in seconds. "} />
              </div>
            }
            subHeading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctaBtn1={{
              btnText: "Continue lesson",
              active: true,
              linkto: "/login",
            }}
            ctaBtn2={{
              btnText: "Learn more",
              active: false,
              linkto: "/signup",
            }}
            codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one/">One</a></nav>\n</body>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={"codeblock2"}
          />
        </div>
       <ExploreCourses/>
      </div>
      {/* section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage-bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center mx-auto gap-5">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-7">
              <CTAbutton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  <p>Explore full catalog</p>
                  <FaArrowRight />
                </div>
              </CTAbutton>
              <CTAbutton active={false} linkto={"/signup"}>
                Learn more
              </CTAbutton>
            </div>
          </div>
        </div>
        <div className="w-11/12 max-w-maxContent flex flex-col items-center mx-auto gap-7 mt-[100px]">
          <div className="flex flex-col lg:justify-between lg:items-start lg:flex-row gap-5 mb-10 ">
            <div className="text-4xl font-semibold lg:w-[45%] lg:max-w-[594px]">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand"} />
            </div>
            <div className="flex flex-col gap-7 lg:w-[40%] ">
              <p className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>
              <div className="self-start">
                <CTAbutton active={true} linkto={"/signup"}>
                  Learn more
                </CTAbutton>
              </div>
            </div>
          </div>
          <TimelineSection/>
          <LearnLanguage/>
        </div>
      </div>
      {/* section -3 */}
      <div className="w-11/12 max-w-maxContent mx-auto flex flex-col justify-between bg-richblack-900 text-white">
          <InstructionSection/>
          <h2 className="font-semibold text-4xl text-center">Reviews from other learners</h2>
          {/* reviews slider */}
      </div>
      {/* section -4 footer */}
      <Footer/>
    </div>
  );
}