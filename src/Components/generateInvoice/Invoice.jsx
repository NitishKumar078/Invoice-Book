import { useState, useEffect, useRef } from "react";
import "./Invoice.css";
import { tableItem } from "../template/template.js";
import { NavLink } from 'react-router-dom';

export default function Invoice() {
  const [tableData, setTableData] = useState([]);
  const [rowIndx, setRowIndx] = useState(1);
  const totalamt = useRef(null);

  useEffect(() => {
    // Initialize tableData with one empty row
    const initialItem = new tableItem(rowIndx, "", "", "", "");
    setTableData([initialItem]);
    setRowIndx(rowIndx + 1); // Update row index for future rows
  }, []);

  const ValidatingInteger = (e,field) =>{
    if (field === "quantity" || field === "pricePerUnit" || field ===  "ContactNo") {
      e.target.value = e.target.value.replace(/[^\d]/g, ""); // Allow only digits
    }
  }
  // Function to handle input changes
  const handleInputChange = (e, rowIndex, field) => {
    // Validating the data type for quantity and pricePerUnit
    ValidatingInteger(e,field);

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

  useEffect(() => {
    let total = 0;
    // Calculation of the total amount
    tableData.forEach(item => {
      total += item.amount;
    });

    if (totalamt.current) {
      totalamt.current.value = total; // Update the value of the input field
    }
  }, [ tableData]); // Depend on tableData to update when it changes

  document.addEventListener("scroll", function() {
    var buttonDiv = document.getElementById("sticky-div");
    if ((window.innerHeight + window.scrollY) >= window.screen.height) {
        // User has reached the bottom of the page
        buttonDiv.classList.add("active");
    } else {
        buttonDiv.classList.remove("active");
    }
  });


  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <div className="company-details">
          <h2>JSR TRADERS</h2>
          <p>
            172, Panthrapalya, Nayandahalli, Mysore road, Bangalore- 560039
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
              Contact No. : <input type="number" id="cnumber"  onChange={(e) => ValidatingInteger(e, "ContactNo")} /> <br />
              GSTIN : <input type="text" value="328dsf1734284" readOnly/> 
            </p>
          </div>
          <div className="invoice-details">
           <div>
           <label htmlFor="invoiceId">Invoice No :</label>{" "}
           <input type="number" name="invoiceId" id="invoiceId" />
           </div>
            <div className="data">
            <label htmlFor="data">Date :</label>{" "}
            <input type="date" name="data" id="data" />
            </div>
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
                <td>
                  <input
                    type="text"
                    value={item.itemName}
                    onChange={(e) => handleInputChange(e, index, "itemName")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) => handleInputChange(e, index, "unit")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(e, index, "quantity")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.pricePerUnit}
                    onChange={(e) =>
                      handleInputChange(e, index, "pricePerUnit")
                    }
                  />
                </td>
                <td>
                  <input type="text" value={item.amount} readOnly />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />
        <button onClick={handleAddRow}>Add Row</button>
        

        <div className="total-section">
          <div className="tax-summary">
            <p>SGST @9%: ₹ 283.50</p>
            <p>CGST @9%: ₹ 283.50</p>
          </div>
          <div className="total-amount">
            <p>Sub Total: ₹ 3,150.00</p>
            <p>Tax (18%): ₹ 567.00</p>
            <hr />
            <h2>
              <input type="number" id="total" ref={totalamt} readOnly></input>
            </h2>
          </div>
        </div>
      </form>
      <div className="terms-and-conditions">
        <h4>
          <u>Terms and Conditions: </u>
        </h4>
        <p>
          Goods once sold cannot be taken back or exchanged. <br />
          Damage in transportation is Risk.
          <br />
          Amount of bill not paid within 15 days, 2.5% interest will be charged{" "}
          <br />
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
      <div id="sticky-div" className="sticky-div">
        <button onClick={handleSave}>Save</button>
        <NavLink to="/viewInvoice"  >
        <button id="sticky-button"> View</button>
      </NavLink>
    </div>

    </div>
  );
}
