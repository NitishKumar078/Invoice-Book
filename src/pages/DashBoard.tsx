import { SquarePlus } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex justify-center items-center relative h-[50vh] border border-blue-200 rounded-[24px] bg-[rgba(156,184,233,0.22)] bg-opacity-90 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md">
      <NavLink
        to="/invoice"
        className="font-roboto flex transform cursor-pointer flex-row-reverse items-center justify-center rounded-[24px] border-0 bg-blue-500 px-[30px] py-[10px] text-[17px] text-white shadow-lg transition-all duration-1000 hover:w-[23vw] hover:border hover:border-purple-500 hover:bg-blue-700"
      >
        create
        <SquarePlus size={32} />
      </NavLink>
    </div>
  );
}
