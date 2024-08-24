import { NavLink } from "react-router-dom";
import "./sidePanal.css";

export default function SideBar() {
  return (
    <aside className="sidebar">
      <nav className="nav ">
        <ul>
        <li className="active">
          <NavLink  to="/" className={(e)=>{ return e.isActive ? "active anchortag"  :" anchortag" }}>
            Home
          </NavLink>
          <br />
        </li>
        <li>
          <NavLink  to="/Create" className={(e)=>{ return e.isActive ? "active anchortag" :" anchortag" }}>
            Create
          </NavLink>
          <br />
        </li>
        <li>
          <NavLink  to="/Invoices" className={(e)=>{ return e.isActive ? "active anchortag" :"anchortag" }}>
            Invoices
          </NavLink>
        </li>
        </ul>
      </nav>
    </aside>
  );
}
