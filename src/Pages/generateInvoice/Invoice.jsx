import { useState, useEffect, useRef } from "react";
import "./Invoice.css";
import axios from "axios";
import { tableItem, invoiceItem } from "__root/DataModels/DataModels";
import { NavLink } from "react-router-dom";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
];

/**
 * A functional component to generate and manage invoices.
 * It handles user input, calculates totals, and saves the invoice data.
 *
 * @return {JSX.Element} The JSX element representing the invoice form.
 */
export default function Invoice() {
  const [tableData, setTableData] = useState([]);
  const [rowIndx, setRowIndx] = useState(1);
  const [state, setState] = useState("");
  const [gsttype, setgsttype] = useState(true); // if gsttype--> true then normal gst(18%) orelse igst(18%)
  const [gstamt, setgstamt] = useState(null);
  const subtotalamt = useRef(null);
  const totalamt = useRef(null);

  useEffect(() => {
    // Initialize tableData with one empty row
    const initialItem = new tableItem(rowIndx, "", "", "", "");
    setTableData([initialItem]);
  }, []);

  const ValidatingInteger = (e, field) => {
    if (
      field === "quantity" ||
      field === "pricePerUnit" ||
      field === "ContactNo"
    ) {
      e.target.value = e.target.value
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*)\./g, "$1");
    }
  };
  // Function to handle input changes
  const handleInputChange = (e, rowIndex, field) => {
    // Validating the data type for quantity and pricePerUnit
    ValidatingInteger(e, field);

    // Update the specific field in the row
    const newTableData = [...tableData];
    newTableData[rowIndex][field] = e.target.value;

    // Update the amount field if quantity and pricePerUnit are present
    if (field === "quantity" || field === "pricePerUnit") {
      const quantity = parseFloat(newTableData[rowIndex].quantity) || 0;
      const pricePerUnit = parseFloat(newTableData[rowIndex].pricePerUnit) || 0;
      newTableData[rowIndex].amount = parseFloat(
        (quantity * pricePerUnit).toFixed(2)
      );
    }

    // Update the state with new table data
    setTableData(newTableData);
  };

  // Function to add a new row
  const handleAddRow = () => {
    const newRow = new tableItem(rowIndx + 1, "", "", "", "");
    setTableData([...tableData, newRow]);
    setRowIndx(rowIndx + 1); // Increment row index for next row
  };

  // Function to handle save action
  const getinvoicedata = async () => {
    const Idate = document.getElementById("Idata").value;
    const Iid = document.getElementById("invoiceId").value;
    const cname = document.getElementById("customername").value;
    const gstid = document.getElementById("gstno").value;
    const cno = document.getElementById("cnumber").value;
    const cadress = document.getElementById("cadress").value;
    const gstamt = document.getElementById("gstno").value;
    const tamt = document.getElementById("total").value;
    const Idata = new invoiceItem(
      Iid,
      Idate,
      cname,
      gstid,
      cno,
      cadress,
      tableData,
      gstamt,
      tamt
    );
    return Idata;
  };

  const handleSave = async () => {
    const invoicedata = await getinvoicedata();
    // try {
    //   console.log("this is the data", invoicedata);
    //   await axios.post("http://localhost:3001/invoices", invoicedata);
    //   alert("Invoice created");
    // } catch (err) {
    //   console.error(err);
    // }
  };

  useEffect(() => {
    let total = 0;
    // Calculation of the total amount
    tableData.forEach((item) => {
      total += item.amount;
    });

    if (subtotalamt.current) {
      subtotalamt.current.value = total; // Update the value of the input field
      setgstamt(parseFloat(((total * 18) / 100).toFixed(2)));
      totalamt.current.value = parseFloat((total * 18) / 100 + total).toFixed(
        2
      );
    }
  }, [tableData]); // Depend on tableData to update when it changes

  document.addEventListener("scroll", function () {
    var buttonDiv = document.getElementById("sticky-div");
    if (window.innerHeight + window.scrollY >= window.screen.height) {
      // User has reached the bottom of the page
      buttonDiv.classList.add("active");
    } else {
      buttonDiv.classList.remove("active");
    }
  });

  const handlestatesele = (e) => {
    setState(e.value);
    const statefound = states.some(
      (i) => i.toLowerCase() === e.value.toLowerCase()
    );
    setgsttype(statefound);
    console.log("is state found ", statefound);
  };

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
              id="customername"
              required
            />{" "}
            <br /> <br />
            <textarea placeholder="Address" id="cadress" />
            <br />
            <div className="statesselection">
              <label htmlFor="state">State</label>
              <select
                id="state"
                value={state}
                onChange={(e) => handlestatesele(e.target)}
              >
                <option value="">Select State</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <p>
              Contact No. :{" "}
              <input
                type="number"
                id="cnumber"
                onChange={(e) => ValidatingInteger(e, "ContactNo")}
              />{" "}
              <br />
              GSTIN : <input type="text" id="gstno" readOnly />
            </p>
          </div>
          <div className="invoice-details">
            <div>
              <label htmlFor="invoiceId">Invoice No :</label>{" "}
              <input type="number" name="invoiceId" id="invoiceId" />
            </div>
            <div className="data">
              <label htmlFor="Idata">Date :</label>{" "}
              <input type="date" name="data" id="Idata" />
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
                    value={item.pricePerUnit || undefined}
                    onChange={(e) =>
                      handleInputChange(e, index, "pricePerUnit")
                    }
                  />
                </td>
                <td>
                  <span> ₹</span>
                  <input
                    type="text"
                    id="rowtotal"
                    value={item.amount || undefined}
                    readOnly
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />
        <button onClick={handleAddRow}>Add Row</button>

        <div className="total-section">
          <div className="tax-summary">
            {gsttype ? (
              <div className="normalgst">
                <span>SGST @9%: ₹ {gstamt / 2} </span>
                <span>CGST @9%: ₹ {gstamt / 2} </span>
              </div>
            ) : (
              <p>IGST @18: ₹ {gstamt}</p>
            )}
          </div>
          <div className="total-amount">
            <p>
              Sub Total: ₹{""}
              <input
                placeholder="Sub total"
                type="text"
                id="subtotal"
                ref={subtotalamt}
                readOnly
              />
            </p>
            <p>
              Total Tax: ₹{" "}
              <input type="text" id="taxtotal" value={gstamt || "0"} readOnly />
            </p>
            <hr />
            <input
              placeholder="Total amount"
              type="text"
              id="total"
              ref={totalamt}
            ></input>
          </div>
        </div>
      </form>
      {/* <div className="terms-and-conditions">
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
      </div> */}
      <div id="sticky-div" className="sticky-div">
        <button onClick={handleSave}>Save</button>
        <NavLink to="/viewInvoice">
          <button id="sticky-button"> View</button>
        </NavLink>
      </div>
    </div>
  );
}
