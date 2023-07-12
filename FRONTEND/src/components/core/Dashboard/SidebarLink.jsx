import React from "react";
import * as Icons from "react-icons/vsc";
import { matchPath, matchRoutes, NavLink, useLocation } from "react-router-dom";
export default function SidebarLink({ link }) {
  const Icon = Icons[link.icon];
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className="text-richblack-5">
      <NavLink
        to={link.path}
        className={`${
          matchRoute(link.path)
            ? "bg-yellow-800 text-yellow-50"
            : "bg-transparent"
        } relative text-sm py-2 px-2 md:px-8  flex items-center gap-x-2`}
      >
        <span
          className={`absolute left-0 top-0 h-full w-[0.25rem] bg-yellow-50 ${
            matchRoute(link.path) ? "opacity-100" : "opacity-0"
          }`}
        ></span>

        <span className="text-lg text-richblack-300">
          <Icon />
        </span>
        <p className="text-richblack-300">{link.name}</p>
      </NavLink>
    </div>
  );
}
