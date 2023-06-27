import React from "react";
import CTAbutton from "../homePage/CTAbutton";
import HighlightText from "../homePage/HighlightText";

export default function LearningGrid() {
  const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];
  return (
    <div className="w-11/12 max-w-maxContent mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-10">
      {LearningGridArray.map((card, index) => {
        return (
          <div
            key={index}
            className={`${index === 0 && "lg:col-span-2 bg-richblack-900"} 
            ${
              card.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800 "
            } ${card.order === 3 && "lg:col-start-2 "} min-h-[250px] p-8`}
          >
            {card.order < 0 ? (
              <div className="flex flex-col gap-y-2">
                <h2 className="font-bold lg:text-4xl text-2xl text-richblack-5">
                  {card.heading}
                </h2>
                <div className="-mt-3 lg:text-4xl text-2xl">
                <HighlightText text={card.highlightText} />
                </div>

                <p className="font-semibold text-richblack-300">{card.description}</p>
                <div className="self-start">
                  <CTAbutton active={true} linkto={card.BtnLink}>
                    <span className="fonte-semibold">{card.BtnText}</span>
                  </CTAbutton>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-y-5">
                <h1 className="text-lg text-richblack-5">{card.heading}</h1>
                <p className="font-medium text-richblack-300">{card.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
