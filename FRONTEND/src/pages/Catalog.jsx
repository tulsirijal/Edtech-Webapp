import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseCard from "../components/core/catalog/CourseCard";
import CourseSlider from "../components/core/catalog/CourseSlider";
import Footer from "../components/core/homePage/Footer";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { getCatalogData } from "../services/operations/catalogData";

export default function Catalog() {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  async function getAllCategories() {
    try {
      const response = await apiConnector("GET", categories.CATEGORIES_API);
      console.log(response.data.data);
      const categoryId = response?.data?.data?.filter(
        (category) =>
          category.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      setCategoryId(categoryId);
      console.log(categoryId);
    } catch (error) {
      console.log(error);
    }
  }
  async function getCategoryDetails() {
    try {
      const response = await getCatalogData(categoryId);
      if (response) {
        setCatalogPageData(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllCategories();
  }, [catalogName]);
  useEffect(() => {
    if(categoryId){
      getCategoryDetails();
    }
  }, [categoryId]);
  return (
    <div className="">
      <div>
        <p className="text-richblack-300">
          {`Home / Catalog /`}{" "}
          <span className="text-yellow-50">{` ${catalogPageData?.selectedCategory?.name}`}</span>
        </p>
        <p className="text-richblack-5 text-4xl">{` ${catalogPageData?.selectedCategory?.name}`}</p>
        <p className="text-richblack-300">{`${catalogPageData?.selectedCategory?.description}`}</p>
      </div>
      <div>
        {/* section 1 */}
        <div>
          <p className="text-richblack-5 text-4xl font-bold">
            Courses to get you started
          </p>
          <div className="flex gap-1 items-center">
            <p className="text-richblack-5">Most popular</p>
            <p className="text-richblack-5">New</p>
          </div>
          <CourseSlider courses = {catalogPageData?.selectedCategory?.courses} />
        </div>
        {/* section 2 */}
        <div>
          <p className="text-richblack-5 text-4xl font-bold">Top Courses in {catalogPageData?.selectedCategory?.name}</p>
          <div>
            <CourseSlider courses = {catalogPageData?.differentCategories} />
          </div>
        </div>
        {/* section 3 */}
        <div>
          <p className="text-richblack-5 text-4xl font-bold">
            Frequently Bought
          </p>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center items-center">
              {
                catalogPageData?.mostSellingCourses?.map((course,index)=>{
                  return <CourseCard course={course} key={index} />
                })
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
