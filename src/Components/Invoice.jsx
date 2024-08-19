import { useState } from "react";
import "./Invoice.css";

export default function Invoice() {
  const [tableData, setTableData] = useState([
    {
      id: 1,
      itemName: "",
      quantity: "",
      unit: "",
      pricePerUnit: "",
      amount: "",
    },
  ]);

  const handleInputChange = (e, rowIndex, field) => {
    const newTableData = [...tableData];
    newTableData[rowIndex][field] = e.target.value;
    setTableData(newTableData);
  };

  const handleNumericInput = (e, rowIndex, field) => {
    const inputValue = e.target.value.replace(/[^\d]/g, "");
    const newTableData = [...tableData];
    newTableData[rowIndex][field] = inputValue;
    setTableData(newTableData);
  };

  const handleAddRow = () => {
    const newRow = {
      id: tableData.length + 1,
      itemName: "",
      quantity: "",
      unit: "",
      pricePerUnit: "",
      amount: "",
    };
    setTableData([...tableData, newRow]);
  };

  const handleSave = () => {
    console.log(tableData);
  };

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <div className="company-details">
          <h2>JSR TRADERS</h2>
          <p>
            172, Panthrapalya, Nayandahalli, Mysore road, Bangalore- 560039{" "}
            <br />
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
      <div className="billing-info">
        <div className="bill-to">
          <h3>Bill To</h3>
          <input type="text" placeholder="customer name" /> <br /> <br />
          <textarea placeholder="Address" />
          <p>
            Contact No. : 09448114669 <br />
            GSTIN : 29AATFM0539R1ZA <br />
            State: 29-Karnataka
          </p>
        </div>
        <div className="invoice-details">
          <label htmlFor="invoiceId" >Invoice No :</label> <input type="number"  name="invoiceId" id="invoiceId"/> <br/>
          <label htmlFor="data" >Date :</label>  <input type="date" name="data" id="data" />
        </div>
      </div>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Price/ unit</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                <input
                  type="text"
                  value={row.itemName}
                  onChange={(e) => handleInputChange(e, index, "itemName")}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.quantity}
                  onChange={(e) => handleInputChange(e, index, "quantity")}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.unit}
                  onChange={(e) => handleNumericInput(e, index, "unit")}
                />
              </td>
              <td>
                <div>
                  <span>₹ </span>
                  <input
                    type="text"
                    value={row.pricePerUnit}
                    onChange={(e) =>
                      handleNumericInput(e, index, "pricePerUnit")
                    }
                  />
                </div>
              </td>
              <td>
                <div>
                  <span>₹ </span>
                  <input
                    type="text"
                    value={row.amount}
                    onChange={(e) => handleNumericInput(e, index, "amount")}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
          <hr></hr>
          <h2>Total: ₹ 3,717.00</h2>
        </div>
      </div>
      <div className="terms-and-conditions">
          <h4><u>Terms and Conditions: </u></h4>
          <p>Goods once sold cannot be taken back or exchanged. <br />
          Damage in transportation is Risk.
          <br />
          Amount of bill not paid within 15 days, 2.5% interest will be charged{" "}
          <br />
          per month. All disputes subject to Bangalore Jurisdiction.
        </p>
      </div>
      <div className="bank-details">
          <h3><u>Bank Details: </u></h3>
          <p>Name: Punjab National Bank, Bangalore, Bhel, Mysore Road <br />
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
