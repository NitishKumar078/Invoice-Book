import { MdOutlineLibraryAdd } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative bg-opacity-90 backdrop-blur-md border border-blue-200 h-[50vh] w-screen overflow-clip  transition-all ease-in duration-100 bg-[rgba(156,184,233,0.22)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-[1px_solid_rgba(156,184,233,0.15)] ">
      <NavLink
        to="/Create"
        className="relative left-1/2 transform -translate-x-1/2 cursor-pointer border-0 font-roboto text-[17px] text-white py-[17px] px-[30px] transition-all duration-200 w-[276px] shadow-lg rounded-[24px] bg-blue-500 flex justify-center items-center flex-row-reverse hover:w-[23vw] hover:bg-blue-700 hover:border hover:border-purple-500"
      >
        create
        <MdOutlineLibraryAdd className="w-[25px] ml-[4px] mr-[11px]" />
      </NavLink>
    </div>
  );
}
