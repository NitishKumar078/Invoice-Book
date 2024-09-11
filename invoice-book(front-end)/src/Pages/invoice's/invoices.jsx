import { useEffect, useState } from "react";
import axios from "axios";
import "./invoices.css";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loadedInvoice, setLoadedInvoice] = useState(null);

  useEffect(() => {
    // Fetch all invoices
    axios
      .get("http://localhost:3001/invoices")
      .then((response) => {
        setInvoices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching invoices:", error);
      });
  }, []);

  const fetchInvoice = async (invoiceId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/invoices/${invoiceId}`
      );
      setLoadedInvoice(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="invoices">
      <h1>Invoices</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Customer</th>
            <th>GST No</th>
            <th>Contact No</th>
            <th>Address</th>
            <th>GST Amount</th>
            <th>Total Amount</th>
            <th>Edit</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.invoiceId}>
              <td>{invoice.invoiceId}</td>
              <td>{invoice.customer}</td>
              <td>{invoice.gstNo}</td>
              <td>{invoice.contactno}</td>
              <td>{invoice.address}</td>
              <td>₹{invoice.gstAmt}</td>
              <td>₹{invoice.totalAmt}</td>
              <td>
                <button onClick={() => fetchInvoice(invoice.invoiceId)}>
                  Edit
                </button>
              </td>
              <td>
                <button>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Invoices;
