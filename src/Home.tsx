import { MdOutlineLibraryAdd } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="  relative flex items-center h-[50vh] left-[calc(21%)] w-[calc(78%-1vh)] overflow-clip border border-blue-200 bg-[rgba(156,184,233,0.22)] bg-opacity-90 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all duration-100 ease-in">
      <NavLink
        to="/Create"
        className="font-roboto relative left-1/2 flex w-[276px] -translate-x-1/2 transform cursor-pointer flex-row-reverse items-center justify-center rounded-[24px] border-0 bg-blue-500 px-[30px] py-[17px] text-[17px] text-white shadow-lg transition-all duration-200 hover:w-[23vw] hover:border hover:border-purple-500 hover:bg-blue-700"
      >
        create
        <MdOutlineLibraryAdd className=" w-[25px] " />
      </NavLink>
    </div>
  );
}
