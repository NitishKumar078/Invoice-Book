import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import {
  FaCircleChevronLeft,
  FaCircleChevronRight,
  FaListUl,
} from "react-icons/fa6";
import { CgUserList } from "react-icons/cg";
import { TbCheckupList } from "react-icons/tb";
import { IoHomeSharp } from "react-icons/io5";
import { RiStickyNoteAddLine } from "react-icons/ri";

export default function SideBar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside
      className={`sidebar transition-all duration-300 fixed top-0 left-0 h-screen  bg-[#33215e] text-white ${
        isExpanded ? "w-64 " : "w-20 collapsed"
      } overflow-hidden`}
    >
      <div className="flex flex-col items-center justify-center p-4 border-b border-[rgb(124 93 199 / 58%)] bg-[#54228d]">
        {/* User Option */}
        <div className="flex items-center justify-between w-full mb-4">
          <FaUserCircle className="text-4xl" />
          <NavLink
            to="/setting"
            className="flex items-center  text-sm hover:underline"
          >
            <span className={isExpanded ? "" : "hidden"}>Username</span>
          </NavLink>
        </div>
        <div
          onClick={toggleSidebar}
          className="cursor-pointer text-2xl relative"
        >
          {isExpanded ? (
            <FaCircleChevronLeft className="left-20 relative" />
          ) : (
            <FaCircleChevronRight className="left-5 relative" />
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center p-2 text-sm font-semibold rounded-lg transition-colors duration-300 hover:bg-[#653B95] ${
                  isActive ? "bg-[#653B95]" : ""
                }`
              }
            >
              <IoHomeSharp className="text-2xl" />
              <span className={`ml-2 ${isExpanded ? "" : "hidden"}`}>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Create"
              className={({ isActive }) =>
                `flex items-center p-2 text-sm font-semibold rounded-lg transition-colors duration-300 hover:bg-[#653B95] ${
                  isActive ? "bg-[#653B95]" : ""
                }`
              }
            >
              <RiStickyNoteAddLine className="text-2xl" />
              <span className={`ml-2 ${isExpanded ? "" : "hidden"}`}>
                Create
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Invoices"
              className={({ isActive }) =>
                `flex items-center p-2 text-sm font-semibold rounded-lg transition-colors duration-300 hover:bg-[#653B95] ${
                  isActive ? "bg-[#653B95]" : ""
                }`
              }
            >
              <FaListUl className="text-2xl" />
              <span className={`ml-2 ${isExpanded ? "" : "hidden"}`}>
                Invoices
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Items"
              className={({ isActive }) =>
                `flex items-center p-2 text-sm font-semibold rounded-lg transition-colors duration-300 hover:bg-[#653B95] ${
                  isActive ? "bg-[#653B95]" : ""
                }`
              }
            >
              <TbCheckupList className="text-2xl" />
              <span className={`ml-2 ${isExpanded ? "" : "hidden"}`}>
                Items
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Customers"
              className={({ isActive }) =>
                `flex items-center p-2 text-sm font-semibold rounded-lg transition-colors duration-300 hover:bg-[#653B95] ${
                  isActive ? "bg-[#653B95]" : ""
                }`
              }
            >
              <CgUserList className="text-2xl" />
              <span className={`ml-2 ${isExpanded ? "" : "hidden"}`}>
                Customers
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
