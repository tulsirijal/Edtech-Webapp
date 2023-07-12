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
  const [selectedTab, setSelectTab] = useState("most-popular");
  const [loading, setLoading] = useState(false);
  async function getAllCategories() {
    try {
      setLoading(true);
      const response = await apiConnector("GET", categories.CATEGORIES_API);
      console.log(response.data.data);
      const categoryId = response?.data?.data?.filter(
        (category) =>
          category.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      setCategoryId(categoryId);
      // console.log(categoryId);
      setLoading(false);
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  }
  async function getCategoryDetails() {
    try {
      setLoading(true);
      const response = await getCatalogData(categoryId);
      if (response) {
        setCatalogPageData(response);
      }
      setLoading(false);
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getAllCategories();
  }, [catalogName]);
  useEffect(() => {
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);
  return (
    <div>
      <div className="">
        <div className="bg-richblack-800">
          {loading ? (
            <div className="text-richblack-300 w-11/12 max-w-maxContent mx-auto min-h-[250px] flex flex-col gap-2 justify-center">
              Loading...
            </div>
          ) : (
            <div className="w-11/12 max-w-maxContent mx-auto min-h-[250px] flex flex-col gap-2 justify-center ">
              <p className="text-richblack-300 text-sm">
                {`Home / Catalog /`}{" "}
                <span className="text-yellow-50">{` ${catalogPageData?.selectedCategory?.name}`}</span>
              </p>
              <p className="text-richblack-5 text-3xl">{` ${catalogPageData?.selectedCategory?.name}`}</p>
              <p className="text-richblack-300 font-medium">{`${catalogPageData?.selectedCategory?.description}`}</p>
            </div>
          )}
        </div>
        <div className="w-11/12 max-w-maxContent mx-auto ">
          {/* section 1 */}
          <div className="">
            <p className=" pt-6 pb-3 text-richblack-5 text-4xl font-bold">
              Courses to get you started
            </p>
            <div className="flex gap-4 items-centerpy-2">
              <p
                className={`${
                  selectedTab === "most-popular" &&
                  "border-b border-yellow-25 text-yellow-25 "
                } text-richblack-5`}
                onClick={() => setSelectTab("most-popular")}
              >
                Most popular
              </p>
              <p
                className={`${
                  selectedTab === "new" &&
                  "border-b border-yellow-25 text-yellow-25 "
                } text-richblack-5`}
                onClick={() => setSelectTab("new")}
              >
                New
              </p>
            </div>
            <div className="w-full h-[1px] bg-richblack-700 mb-4"></div>
            <CourseSlider
              courses={catalogPageData?.selectedCategory?.courses}
            />
          </div>
          {/* section 2 */}
          <div className="mt-16">
            <p className="text-richblack-5 text-4xl font-bold py-4">
              Top Courses in {catalogPageData?.selectedCategory?.name}
            </p>
            <div>
              <CourseSlider courses={catalogPageData?.differentCategories} />
            </div>
          </div>
          {/* section 3 */}
          <div className="mt-16">
            <p className="text-richblack-5 text-4xl font-bold py-4">
              Frequently Bought
            </p>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center items-center gap-y-8 mb-10">
                {catalogPageData?.mostSellingCourses?.map((course, index) => {
                  return <CourseCard course={course} key={index} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
