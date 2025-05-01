import {
  selectCustomer,
  selectInvoice,
  selectItems,
} from '@/Store/Selectors/Selectors';
import { SquarePlus } from 'lucide-react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function Home() {
  const ListInvoice = useSelector(selectInvoice);
  const Listcustomer = useSelector(selectCustomer);
  const ListItems = useSelector(selectItems);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center items-center relative h-[40vh] border border-blue-200 rounded-[24px] bg-[rgba(156,184,233,0.22)] bg-opacity-90 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md">
        <NavLink
          to="/invoice"
          className="font-roboto group h-[6vh] flex cursor-pointer items-center justify-center gap-2 rounded-[24px] border-0 bg-blue-500 px-8 py-2 text-[17px] text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 overflow-hidden relative"
          style={{ minWidth: 120 }}
        >
          <span
            className="transition-all duration-300 ease-in-out max-w-0 group-hover:max-w-xs group-hover:ml-2 overflow-hidden"
            style={{ display: 'inline-block' }}
          >
            create New Invoice
          </span>
          <SquarePlus
            size={28}
            className="transition-transform duration-300 group-hover:rotate-90"
          />
        </NavLink>
      </div>
      <div className="flex flex-row gap-4 ">
        <NavLink
          className="bg-white rounded-lg w-1/3 h-[30vh] shadow-lg p-5 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-blue-50"
          to="/listInvoices"
        >
          <h2 className="text-2xl font-semibold">Total Invoices Created</h2>
          <p className="text-2xl font-bold">{ListInvoice.length}</p>
          <p className="text-1xl text-gray-500">Total Invoices</p>
        </NavLink>
        <NavLink
          className="bg-white rounded-lg w-1/3 h-[30vh] shadow-lg p-5 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-blue-50"
          to="/listInvoices"
        >
          <h2 className="text-2xl font-semibold">Total Customers</h2>
          <p className="text-2xl font-bold">{Listcustomer.length}</p>
          <p className="text-1xl text-gray-500">Total Invoices</p>
        </NavLink>
        <NavLink
          className="bg-white rounded-lg w-1/3 h-[30vh] shadow-lg p-5 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-blue-50"
          to="/listInvoices"
        >
          <h2 className="text-2xl font-semibold">Total Number of Items</h2>
          <p className="text-2xl font-bold">{ListItems.length}</p>
          <p className="text-1xl text-gray-500">Total Invoices</p>
        </NavLink>
      </div>
    </div>
  );
}
