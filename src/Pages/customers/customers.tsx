import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Customer } from '@/DataModels/DataModels';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteCustomer } from '@/Store/Reducers/customersSlice';

export default function Customers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const customer = useSelector(
    (state: { customersDB: any; customer: Customer[] }) =>
      state?.customersDB.customers
  );

  useEffect(() => {
    setCustomers(customer);
  }, []);

  const handleCustomerEdit = (Customerdata: Customer) => {
    navigate('/customers/newCustomer', {
      state: { Customerdata, mode: 'Edit' },
    });
  };

  const handleCustomerDeletion = async (key: string) => {
    //delete from redux and the index Db
    dispatch(deleteCustomer(key));
    window.location.reload();
  };

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
            <th className="border-b py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.customer_id || 'N/A'}
              className="even:bg-gray-100 hover:bg-gray-200"
            >
              <td className="border border-gray-300 p-2">{customer.name}</td>
              <td className="border border-gray-300 p-2">{customer.company}</td>
              <td className="border border-gray-300 p-2">{customer.gstinNo}</td>
              <td className="border border-gray-300 p-2">{customer.phone}</td>
              <td className="border border-gray-300 p-2">{customer.address}</td>
              <td className="border-b p-2">
                <button
                  className="py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200 mr-2"
                  onClick={() => {
                    handleCustomerEdit(customer);
                  }}
                >
                  Edit
                </button>
                <button
                  className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-200"
                  onClick={() => {
                    handleCustomerDeletion(customer.customer_id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
