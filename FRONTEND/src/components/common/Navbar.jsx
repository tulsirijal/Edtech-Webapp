import React, { useEffect, useState } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import CompanyLogo from "../../assets/Logo/Logo-Full-Light.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDropdown } from "react-icons/io";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";

export default function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItem } = useSelector((state) => state.cart);
  const [currentNav, setCurrentNav] = useState(NavbarLinks[0].title);
  const [subLinks, setSubLinks] = useState([]);
  async function fetchSubLinks() {
    const result = await apiConnector("GET", categories.CATEGORIES_API);
    setSubLinks(result.data.data);
  }
  useEffect(() => {
    fetchSubLinks();
  }, []);
  function handleCurrentNav(value) {
    setCurrentNav(value);
  }

  return (
    <div className="border-b-[1px] border-b-richblack-700  ">
      <nav className="w-11/12 max-w-maxContent mx-auto py-2 flex justify-between items-center">
        <Link to="/">
          <img src={CompanyLogo} className="w-[150px]" />
        </Link>
        <ul className="hidden md:flex gap-4">
          {NavbarLinks.map((navItem, index) => {
            return (
              <li key={index}>
                {navItem.title === "Catalog" ? (
                  <div className="relative flex items-center gap-2 group">
                    <div className="text-richblack-25 flex gap-[5px] items-center">
                        <p className="text-richblack-25">{navItem.title}</p>
                        <IoIosArrowDropdown />
                    </div>

                    <div
                      className="invisible absolute left-[50%] z-[10]
                                translate-x-[-50%] translate-y-[50%]
                                top-[0%]
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px]"
                    >
                      <div
                        className="absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5"
                      ></div>

                      {subLinks.length ? (
                        subLinks.map((subLink, index) => (
                          <Link className="hover:bg-richblack-50 py-2 px-4 rounded-md" to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} key={index}>
                            <p>{subLink.name}</p>
                          </Link>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    onClick={() => handleCurrentNav(navItem.title)}
                    className={`${
                      currentNav === navItem.title
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                    to={navItem?.path}
                  >
                    {navItem?.title}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2 text-richblack-5">
          {user && user.accountType !== "Teacher" && token!==null && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart />
              {totalItem > 0 && <span>{totalItem}</span>}
            </Link>
          )}
          {token === null && (
            <Link
              className="border rounded-[8px] px-2 py-1 text-richblack-100 border-richblack-700 bg-richblack-800"
              to="/login"
            >
              Login
            </Link>
          )}
          {token === null && (
            <Link
              className="border rounded-[8px] px-2 py-1 text-richblack-100 border-richblack-700 bg-richblack-800"
              to="/signup"
            >
              Signup
            </Link>
          )}
          {token !== null && (<ProfileDropDown />)}
        </div>
        
      </nav>
    </div>
  );
}
