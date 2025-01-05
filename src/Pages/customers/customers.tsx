import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

interface Customer {
  customerId: number;
  nick_name: string;
  name: string;
  gstNo: string;
  contactNo: string;
  address: string;
}

/**
 * Renders a table of customers fetched from the server.
 *
 * @return {JSX.Element} A table of customer data.
 */
export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    setCustomers([
      {
        customerId: 1,
        nick_name: 'JD',
        name: 'John Doe',
        gstNo: '1234567890',
        contactNo: '1234567890',
        address: '123 Main St, Anytown, USA',
      },
      {
        customerId: 2,
        nick_name: 'JS',
        name: 'Jane Smith',
        gstNo: '0987654321',
        contactNo: '9876543210',
        address: '456 Oak St, Anytown, USA',
      },
      {
        customerId: 3,
        nick_name: 'JF',
        name: 'John Francis',
        gstNo: '1234567890',
        contactNo: '1234567890',
        address: '789 Elm St, Anytown, USA',
      },
      {
        customerId: 4,
        nick_name: 'JG',
        name: 'John Griffin',
        gstNo: '0987654321',
        contactNo: '9876543210',
        address: '999 Maple St, Anytown, USA',
      },
      {
        customerId: 5,
        nick_name: 'JH',
        name: 'John Harris',
        gstNo: '1234567890',
        contactNo: '1234567890',
        address: '1111 Pine St, Anytown, USA',
      },
      {
        customerId: 6,
        nick_name: 'JI',
        name: 'John Irving',
        gstNo: '0987654321',
        contactNo: '9876543210',
        address: '2222 Spruce St, Anytown, USA',
      },
      {
        customerId: 7,
        nick_name: 'JJ',
        name: 'John Jackson',
        gstNo: '1234567890',
        contactNo: '1234567890',
        address: '3333 Oak St, Anytown, USA',
      },
      {
        customerId: 8,
        nick_name: 'JK',
        name: 'John Knight',
        gstNo: '0987654321',
        contactNo: '9876543210',
        address: '4444 Maple St, Anytown, USA',
      },
      {
        customerId: 9,
        nick_name: 'JL',
        name: 'John Lopez',
        gstNo: '1234567890',
        contactNo: '1234567890',
        address: '5555 Pine St, Anytown, USA',
      },
      {
        customerId: 10,
        nick_name: 'JM',
        name: 'John Martin',
        gstNo: '0987654321',
        contactNo: '9876543210',
        address: '6666 Spruce St, Anytown, USA',
      },
    ]);
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
            <th className="border border-gray-300 p-2">Customer ID</th>
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
              key={customer.customerId}
              className="even:bg-gray-100 hover:bg-gray-200"
            >
              <td className="border border-gray-300 p-2">
                {customer.customerId}
              </td>
              <td className="border border-gray-300 p-2">
                {customer.nick_name}
              </td>
              <td className="border border-gray-300 p-2">{customer.name}</td>
              <td className="border border-gray-300 p-2">{customer.gstNo}</td>
              <td className="border border-gray-300 p-2">
                {customer.contactNo}
              </td>
              <td className="border border-gray-300 p-2">{customer.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
