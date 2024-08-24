import { useState, useEffect } from "react";
import "./Invoice.css";
import { tableItem } from '../template/template.js';

export default function Invoice() {
  const [tableData, setTableData] = useState([]);
  const [rowIndx, setRowIndx] = useState(1);

  useEffect(() => {
    // Initialize tableData with one empty row
    const initialItem = new tableItem(rowIndx, "", "", "", "");
    setTableData([initialItem]);
    setRowIndx(rowIndx + 1); // Update row index for future rows
  }, []);

  // Function to handle input changes
  const handleInputChange = (e, rowIndex, field) => {
    // Validating the data type for quantity and pricePerUnit
    if (field === "quantity" || field === "pricePerUnit") {
      e.target.value = e.target.value.replace(/[^\d]/g, ""); // Allow only digits
    }

    // Update the specific field in the row
    const newTableData = [...tableData];
    newTableData[rowIndex][field] = e.target.value;

    // Update the amount field if quantity and pricePerUnit are present
    if (field === "quantity" || field === "pricePerUnit") {
      const quantity = parseFloat(newTableData[rowIndex].quantity) || 0;
      const pricePerUnit = parseFloat(newTableData[rowIndex].pricePerUnit) || 0;
      newTableData[rowIndex].amount = quantity * pricePerUnit;
    }

    // Update the state with new table data
    setTableData(newTableData);
  };

  // Function to add a new row
  const handleAddRow = () => {
    const newRow = new tableItem(rowIndx, "", "", "", "");
    setTableData([...tableData, newRow]);
    setRowIndx(rowIndx + 1); // Increment row index for next row
  };

  // Function to handle save action
  const handleSave = () => {
    console.log(tableData);
  };

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <div className="company-details">
          <h2>JSR TRADERS</h2>
          <p>
            172, Panthrapalya, Nayandahalli, Mysore road, Bangalore- 560039 <br />
            Phone no.: 9379060796 <br />
            Email: jsr_traders@yahoo.con <br />
            GSTIN: 29AKNPR1200J1Z1, <br />
            State: 29-Karnataka
          </p>
        </div>
        <div className="invoice-title">
          <h1>Sales Invoice</h1>
        </div>
      </div>

      <form>
        <div className="billing-info">
          <div className="bill-to">
            <h3>Bill To</h3>
            <input
              type="text"
              placeholder="customer name"
              required
            /> <br /> <br />
            <textarea placeholder="Address" />
            <p>
              Contact No. : 09448114669 <br />
              GSTIN : 29AATFM0539R1ZA <br />
              State: 29-Karnataka
            </p>
          </div>
          <div className="invoice-details">
            <label htmlFor="invoiceId">Invoice No :</label>{" "}
            <input type="number" name="invoiceId" id="invoiceId" /> <br />
            <label htmlFor="data">Date :</label>{" "}
            <input type="date" name="data" id="data" />
          </div>
        </div>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item name</th>
              <th>Unit</th>
              <th>Quantity</th>
              <th>Price/ Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td><input type="text" value={item.itemName} onChange={(e) => handleInputChange(e, index, 'itemName')} /></td>
                <td><input type="text" value={item.unit} onChange={(e) => handleInputChange(e, index, 'unit')} /></td>
                <td><input type="text" value={item.quantity} onChange={(e) => handleInputChange(e, index, 'quantity')} /></td>
                <td><input type="text" value={item.pricePerUnit} onChange={(e) => handleInputChange(e, index, 'pricePerUnit')} /></td>
                <td><input type="text" value={item.amount} readOnly /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>

      <br />
      <button onClick={handleAddRow}>Add Row</button>
      <button onClick={handleSave}>Save</button>

      <div className="total-section">
        <div className="tax-summary">
          <p>SGST @9%: ₹ 283.50</p>
          <p>CGST @9%: ₹ 283.50</p>
        </div>
        <div className="total-amount">
          <p>Sub Total: ₹ 3,150.00</p>
          <p>Tax (18%): ₹ 567.00</p>
          <hr />
          <h2>Total: ₹ 3,717.00</h2>
        </div>
      </div>
      <div className="terms-and-conditions">
        <h4>
          <u>Terms and Conditions: </u>
        </h4>
        <p>
          Goods once sold cannot be taken back or exchanged. <br />
          Damage in transportation is Risk.
          <br />
          Amount of bill not paid within 15 days, 2.5% interest will be charged <br />
          per month. All disputes subject to Bangalore Jurisdiction.
        </p>
      </div>
      <div className="bank-details">
        <h3>
          <u>Bank Details: </u>
        </h3>
        <p>
          Name: Punjab National Bank, Bangalore, Bhel, Mysore Road <br />
          Account No.: 4247002100500917
          <br />
          IFSC code: PUNB0424700
          <br />
          Account name: JSR TRADERS
        </p>
      </div>
      <div className="signature">
        <p>For: JSR TRADERS</p>
        <p>Authorized Signatory</p>
      </div>
    </div>
  );
}
