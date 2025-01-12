import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Customer } from '@/DataModels/DataModels';

/**
 * Renders a table of customers fetched from the server.
 *
 * @return {JSX.Element} A table of customer data.
 */
export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const customer = useSelector(
    (state: { customersDB: any; customer: Customer[] }) =>
      state?.customersDB.customers
  );

  useEffect(() => {
    setCustomers(customer);
  }, []);

  return (
    <div className="createcart relative w-[calc(80vw)]  left-[calc(16rem)] top-0 bottom-0 right-1vw overflow-y-auto p-5 bg-white shadow-lg transition-all duration-300 ease-in-out customersList">
      <NavLink to="/Customers/newCustomer">
        <button className=" z-10 py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
          Add Item
        </button>
      </NavLink>
      <table className="relative table-auto w-full border-collapse border border-gray-300 mt-5">
        <caption className="text-2xl font-bold mb-4">Customers</caption>
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 p-2">Nick Name</th>
            <th className="border border-gray-300 p-2">Company Name</th>
            <th className="border border-gray-300 p-2">GST No</th>
            <th className="border border-gray-300 p-2">Contact No</th>
            <th className="border border-gray-300 p-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.customer_id || 'N/A'}
              className="even:bg-gray-100 hover:bg-gray-200"
            >
              <td className="border border-gray-300 p-2">{customer.name}</td>
              <td className="border border-gray-300 p-2">{customer.name}</td>
              <td className="border border-gray-300 p-2">{customer.gstinNo}</td>
              <td className="border border-gray-300 p-2">{customer.phone}</td>
              <td className="border border-gray-300 p-2">{customer.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
