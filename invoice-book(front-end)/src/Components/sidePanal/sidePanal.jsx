import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";
import { CgUserList } from "react-icons/cg";
import { TbCheckupList } from "react-icons/tb";
import { FaListUl } from "react-icons/fa6";
import { IoHomeSharp } from "react-icons/io5";
import { RiStickyNoteAddLine } from "react-icons/ri";
import "./sidePanal.css";

export default function SideBar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="sidebar-header">
        {/* User Option */}
        <div className="user-option">
          {/* Logo */}
          <FaUserCircle id="userlogo" alt="logo" className="user-avatar" />
          <NavLink
            to="/setting"
            className={(e) => (e.isActive ? "settingnl-active" : "settingnl")}>
            <span className={isExpanded ? " " : "hidden"}> Username</span>
          </NavLink>
        </div>
        <div className="toggle">
          {isExpanded ? (
            <FaCircleChevronLeft
              className="toggle-button"
              onClick={toggleSidebar}
            />
          ) : (
            <FaCircleChevronRight
              className="toggle-button"
              onClick={toggleSidebar}
            />
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav">
        <ul>
          <li>
            <NavLink
              to="/"
              className={(e) =>
                e.isActive ? "active anchortag" : "notactive_achortag"
              }>
              <IoHomeSharp className="sidePanal_menuicons" />
              <span className={isExpanded ? " " : "hidden"}>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Create"
              className={(e) =>
                e.isActive ? "active anchortag" : "notactive_achortag"
              }>
              <RiStickyNoteAddLine className="sidePanal_menuicons" />
              <span className={isExpanded ? " " : "hidden"}>Create</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Invoices"
              className={(e) =>
                e.isActive ? "active anchortag" : "notactive_achortag"
              }>
              <FaListUl className="sidePanal_menuicons" />
              <span className={isExpanded ? " " : "hidden"}>Invoices</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Items"
              className={(e) =>
                e.isActive ? "active anchortag" : "notactive_achortag"
              }>
              <TbCheckupList className="sidePanal_menuicons" />
              <span className={isExpanded ? " " : "hidden"}>Items</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Customers"
              className={(e) =>
                e.isActive ? "active anchortag" : "notactive_achortag"
              }>
              <CgUserList className="sidePanal_menuicons" />
              <span className={isExpanded ? " " : "hidden"}>Customers</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
