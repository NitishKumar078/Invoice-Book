import { useState, useEffect } from "react";
import "./customers.css";
import { NavLink } from 'react-router-dom';
// import  axios from "axios";

/**
 * Renders a table of customers fetched from the server.
 *
 * @return {JSX.Element} A table of customer data.
 */
export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // axios.get("http://localhost:3001/customers")
    //     .then(response => {
    //         setCustomers(response.data);
    //     })
    //     .catch(error => {
    //         console.error("Error fetching customers:", error);
    //     });

    setCustomers([
      {
        customerId: 1,
        nick_name: "JD",
        name: "John Doe",
        gstNo: "1234567890",
        contactNo: "1234567890",
        address: "123 Main St, Anytown, USA",
      },
      {
        customerId: 2,
        nick_name: "JS",
        name: "Jane Smith",
        gstNo: "0987654321",
        contactNo: "9876543210",
        address: "456 Oak St, Anytown, USA",
      },
      {
        customerId: 3,
        nick_name: "JF",
        name: "John Francis",
        gstNo: "1234567890",
        contactNo: "1234567890",
        address: "789 Elm St, Anytown, USA",
      },
      {
        customerId: 4,
        nick_name: "JG",
        name: "John Griffin",
        gstNo: "0987654321",
        contactNo: "9876543210",
        address: "999 Maple St, Anytown, USA",
      },
      {
        customerId: 5,
        nick_name: "JH",
        name: "John Harris",
        gstNo: "1234567890",
        contactNo: "1234567890",
        address: "1111 Pine St, Anytown, USA",
      },
      {
        customerId: 6,
        nick_name: "JI",
        name: "John Irving",
        gstNo: "0987654321",
        contactNo: "9876543210",
        address: "2222 Spruce St, Anytown, USA",
      },
      {
        customerId: 7,
        nick_name: "JJ",
        name: "John Jackson",
        gstNo: "1234567890",
        contactNo: "1234567890",
        address: "3333 Oak St, Anytown, USA",
      },
      {
        customerId: 8,
        nick_name: "JK",
        name: "John Knight",
        gstNo: "0987654321",
        contactNo: "9876543210",
        address: "4444 Maple St, Anytown, USA",
      },
      {
        customerId: 9,
        nick_name: "JL",
        name: "John Lopez",
        gstNo: "1234567890",
        contactNo: "1234567890",
        address: "5555 Pine St, Anytown, USA",
      },
      {
        customerId: 10,
        nick_name: "JM",
        name: "John Martin",
        gstNo: "0987654321",
        contactNo: "9876543210",
        address: "6666 Spruce St, Anytown, USA",
      },
    ]);
    console.log("this is customoer ");
  }, []);

  return (
    <div className="customersList">

      <NavLink to="/Customers/newCustomer" id="add-customer-button" >
        <button>Add Item</button>
      </NavLink>
      <table>
        <caption>Customers</caption>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Nick Name</th>
            <th>Name</th>
            <th>GST No</th>
            <th>Contact No</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customerId}>
              <td>{customer.customerId}</td>
              <td>{customer.nick_name}</td>
              <td>{customer.name}</td>
              <td>{customer.gstNo}</td>
              <td>{customer.contactNo}</td>
              <td>{customer.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
