import React from "react";
import HighlightText from "../components/core/homePage/HighlightText";
import Banner1 from "../assets/Images/aboutus1.webp";
import Banner2 from "../assets/Images/aboutus2.webp";
import Banner3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";
import Quote from "../components/core/AboutPage/Quote";
import Stats from "../components/core/AboutPage/Stats";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactForm from "../components/core/AboutPage/ContactFormSection";
import Footer from "../components/core/homePage/Footer";
export default function AboutPage() {
  return (
    <div className="">
      {/* section - 1 */}
      <div className="w-11/12 max-w-maxContent mx-auto flex flex-col justify-center items-center mt-14">
        <div className="md:text-center mx-auto md:w-[90%] lg:w-[65%]">
          <h1 className="text-richblack-5 text-4xl font-semibold mb-4">
            Driving Innovation in Online Education for a{" "}
            <HighlightText text={"Brighter future"} />
          </h1>
          <p className="text-richblack-100 font-semibold">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
        </div>
        <div className="mx-auto flex flex-col items-center justify-center flex-wrap md:flex-row gap-10 mt-8">
          <img src={Banner1} />
          <img src={Banner2} />
          <img src={Banner3} />
        </div>
      </div>
      {/* section - 2 */}
      <div className="border-b-[1px] border-richblack-700">
        <Quote />
      </div>
      {/* section - 3 */}

      <div className="w-11/12 max-w-maxContent mx-auto flex flex-col  gap-y-8 lg:gap-y-16">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-y-10 pt-4 mt-4 lg:mt-10">
          <div className="lg:w-[50%] flex flex-col gap-5">
            <h2 className="font-semibold text-4xl text-transparent bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text ">
              Our Founding Story
            </h2>
            <p className="font-semibold text-richblack-300">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <p className="font-semibold text-richblack-300">
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>
          {/* image*/}
          <div>
            <img
              className="shadow-[0_0_20px_0] shadow-[#FC6767]"
              src={FoundingStory}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-y-5 my-8">
          <div className="lg:w-[40%] flex flex-col gap-y-5">
            <h2
              className="bg-gradient-to-b from-[#FF512F] to-[#F09819] 
                bg-clip-text text-4xl font-semibold text-transparent"
            >
              Our Vision
            </h2>
            <p className="font-semibold text-richblack-300 w-[90%]">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>
          <div className="lg:w-[40%] flex flex-col justify-center gap-y-5">
            <h2 className="text-4xl ">
                <HighlightText text={"Our mission"} />
            </h2>
            <p className="font-semibold text-richblack-300 w-[90%]">
              Our mission goes beyond just delivering courses online. We wanted
              to create a vibrant community of learners, where individuals can
              connect, collaborate, and learn from one another. We believe that
              knowledge thrives in an environment of sharing and dialogue, and
              we foster this spirit of collaboration through forums, live
              sessions, and networking opportunities.
            </p>
          </div>
        </div>
      </div>
      {/* section 4 */}
      <div className="bg-richblack-700 my-5">
        <Stats/>
      </div>
      {/* section 5 */}
      <div className=" w-full flex flex-col gap-y-5 items-center justify-between">
        <LearningGrid/>
        <ContactForm/>
      </div>
      <div className="mt-10"><Footer/></div>
    </div>
  );
}
