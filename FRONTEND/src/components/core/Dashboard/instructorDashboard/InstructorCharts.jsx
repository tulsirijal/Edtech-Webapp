import React, { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
Chart.register(...registerables);
export default function InstructorCharts({ courses }) {
  const [currentChart, setCurrentChart] = useState("students");
  function randomColors(noOfColor) {
    const colors = [];
    for (let i = 0; i < noOfColor; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  }
  // data for student info
  const dataOfStudent = {
    labels: courses?.map((course) => course.courseName),
    datasets: [
      {
        data: courses?.map((course) => course.totalStudentsEnrolled),
        backgroundColor: randomColors(courses?.length),
      },
    ],
  };
  // data for income info
  const dataOfIncome = {
    labels: courses?.map((course) => course.courseName),
    datasets: [
      {
        data: courses?.map((course) => course.totalAmount),
        backgroundColor: randomColors(courses?.length),
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
  };
  return (
    <div className="bg-richblack-800  flex flex-1 flex-col gap-3 p-4 rounded-md">
      <p className="text-richblack-5 font-bold">Visualize</p>
      <div className="flex items-center gap-3">
        <button
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currentChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
          onClick={() => setCurrentChart("income")}
        >
          Income
        </button>
        <button
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currentChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
          onClick={() => setCurrentChart("students")}
        >
          Students
        </button>
      </div>
      <div className="relative mx-auto  h-full  aspect-square  ">
        <Pie
          data={currentChart === "students" ? dataOfStudent : dataOfIncome}
          options={options}
        />
      </div>
    </div>
  );
}
