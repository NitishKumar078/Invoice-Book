import React, { useState, useEffect, useRef } from "react";
import { tableItem, invoiceItem } from "../../DataModels/DataModels";
import { NavLink } from "react-router-dom";

interface State {
  value: string;
}

const states: State[] = [
  { value: "Andhra Pradesh" },
  { value: "Arunachal Pradesh" },
  { value: "Assam" },
  { value: "Bihar" },
  { value: "Chhattisgarh" },
  { value: "Goa" },
  { value: "Gujarat" },
  { value: "Haryana" },
  { value: "Himachal Pradesh" },
  { value: "Jammu and Kashmir" },
  { value: "Jharkhand" },
  { value: "Karnataka" },
  { value: "Kerala" },
  { value: "Madhya Pradesh" },
  { value: "Maharashtra" },
  { value: "Manipur" },
  { value: "Meghalaya" },
  { value: "Mizoram" },
  { value: "Nagaland" },
  { value: "Odisha" },
  { value: "Punjab" },
  { value: "Rajasthan" },
  { value: "Sikkim" },
  { value: "Tamil Nadu" },
  { value: "Telangana" },
  { value: "Tripura" },
  { value: "Uttarakhand" },
  { value: "Uttar Pradesh" },
  { value: "West Bengal" },
];

interface InvoiceProps {}

const Invoice: React.FC<InvoiceProps> = () => {
  const [tableData, setTableData] = useState<tableItem[]>([]);
  const [rowIndx, setRowIndx] = useState<number>(1);
  const [state, setState] = useState<string>("");
  const [gsttype, setgsttype] = useState<boolean>(true); // if gsttype--> true then normal gst(18%) orelse igst(18%)
  const [gstamt, setgstamt] = useState<number | null>(null);
  const subtotalamt = useRef<HTMLInputElement>(null);
  const totalamt = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initialize tableData with one empty row
    const initialItem = new tableItem(rowIndx, "", "", "", "");
    setTableData([initialItem]);
  }, []);

  const ValidatingInteger = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
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
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    field: string
  ) => {
    // Validating the data type for quantity and pricePerUnit
    ValidatingInteger(e, field);

    // Update the specific field in the row
    const newTableData = [...tableData];
    if (
      field === "quantity" ||
      field === "pricePerUnit" ||
      field === "amount"
    ) {
      newTableData[rowIndex][field] = e.target.value;
    } else {
      console.log("somthing is wrong");
    }
    // Update the amount field if quantity and pricePerUnit are present
    if (field === "quantity" || field === "pricePerUnit") {
      const quantity = parseFloat(newTableData[rowIndex].quantity) || 0;
      const pricePerUnit = parseFloat(newTableData[rowIndex].pricePerUnit) || 0;
      newTableData[rowIndex].amount = (quantity * pricePerUnit).toFixed(2);
    }

    // Update the state with new table data
    setTableData(newTableData);
  };

  // Function to add a new row
  const handleAddRow = () => {
    const newRow = new tableItem(rowIndx + 1, "", "", "", "");
    setTableData([...tableData, newRow]);
    setRowIndx(rowIndx + 1); // Increment row index for next row

    if(rowIndx === 1){
      const delerowEle = document.getElementById(`deleteRow`)
      if(delerowEle)
      delerowEle.style.display = "block"
    }
  };

  const handleDeleteRow = () => {
    const newTableData = [...tableData];
    newTableData.pop();
    setTableData(newTableData);
    setRowIndx(rowIndx - 1);
    if(rowIndx === 2){
      const delerowEle = document.getElementById(`deleteRow`)
      if(delerowEle)
      delerowEle.style.display = "none"
    }
  };

  // Function to handle save action
  const getinvoicedata = async () => {
    const Idate = (document.getElementById("Idata") as HTMLInputElement).value;
    const Iid = (document.getElementById("invoiceId") as HTMLInputElement)
      .value;
    const cname = (document.getElementById("customername") as HTMLInputElement)
      .value;
    const gstid = (document.getElementById("gstno") as HTMLInputElement).value;
    const cno = (document.getElementById("cnumber") as HTMLInputElement).value;
    const cadress = (document.getElementById("cadress") as HTMLInputElement)
      .value;
    const gstamt =
      parseFloat(
        (document.getElementById("gstno") as HTMLInputElement).value
      ) || 0;
    const tamt =
      parseFloat(
        (document.getElementById("total") as HTMLInputElement).value
      ) || 0;
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
    console.log("invoicedata", invoicedata);
  };

  useEffect(() => {
    let total = 0;
    // Calculation of the total amount
    tableData.forEach((item) => {
      total += parseFloat(item.amount) || 0;
    });

    if (subtotalamt.current && totalamt.current) {
      subtotalamt.current.value = total.toFixed(2); // Update the value of the input field
      setgstamt(parseFloat(((total * 18) / 100).toFixed(2)));
      totalamt.current.value = (total * 1.18).toFixed(2);
    }
  }, [tableData]); // Depend on tableData to update when it changes


  const handlestatesele = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
    const statefound = states.some(
      (i) => i.value.toLowerCase() === e.target.value.toLowerCase()
    );
    setgsttype(statefound);
    console.log("is state found ", statefound);
  };

  return (
    <div className="createcart mx-auto p-5  left-[calc(16rem)]  bg-white shadow-lg  right-[5px] absolute block transition-all duration-300 invoice-container">
      <div className="flex justify-between border-b pb-2 invoice-header">
        <div className="w-[60%] company-details">
          <h2 className="text-2xl font-bold">JSR TRADERS</h2>
          <p>
            172, Panthrapalya, Nayandahalli, Mysore road, Bangalore- 560039
            <br />
            Phone no.: 9379060796
            <br />
            Email: jsr_traders@yahoo.con
            <br />
            GSTIN: 29AKNPR1200J1Z1
            <br />
            State: 29-Karnataka
          </p>
        </div>
        <div className="text-right invoice-title">
          <h1 className="text-4xl">Sales Invoice</h1>
        </div>
      </div>

      <form>
        <div className="flex justify-between mt-5 billing-info">
          <div className="bill-to">
            <h3 className="text-lg font-semibold">Bill To</h3>
            <input
              type="text"
              placeholder="customer name"
              id="customername"
              className="mt-2 p-2 border rounded w-full"
              required
            />
            <br />
            <br />
            <textarea
              placeholder="Address"
              id="cadress"
              className="w-full mt-2 p-2 border rounded"
            />
            <br />
            <div className="flex flex-row items-center mt-3 statesselection">
              <label htmlFor="state" className="pr-2">
                State
              </label>
              <select
                id="state"
                value={state}
                onChange={handlestatesele}
                className="p-2 border rounded"
              >
                <option value="">Select State</option>
                {states.map((state, index) => (
                  <option key={index} value={state.value}>
                    {state.value}
                  </option>
                ))}
              </select>
            </div>
            <p className="mt-3">
              Contact No.:
              <input
                type="number"
                id="cnumber"
                onChange={(e) => ValidatingInteger(e, "ContactNo")}
                className="ml-2 p-2 border rounded"
              />
              <br />
              GSTIN:
              <input
                type="text"
                id="gstno"
                readOnly
                className="ml-2 p-2 border rounded"
              />
            </p>
          </div>
          <div className="invoice-details">
            <div>
              <label htmlFor="invoiceId" className="block">
                Invoice No:
              </label>
              <input
                type="number"
                name="invoiceId"
                id="invoiceId"
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="data mt-2">
              <label htmlFor="Idata" className="block">
                Date:
              </label>
              <input
                type="date"
                name="data"
                id="Idata"
                className="p-2 border rounded w-full"
              />
            </div>
          </div>
        </div>

        <table className="w-full mt-5 border-collapse invoice-table">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Item name</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Price/ Quantity</th>
              <th className="p-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={item.id} className="even:bg-gray-100 hover:bg-gray-200">
                <td className="p-2 border">{item.id}</td>
                <td className="p-2 border">
                  <input
                    type="text"
                    value={item.itemName}
                    onChange={(e) => handleInputChange(e, index, "itemName")}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) => handleInputChange(e, index, "unit")}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(e, index, "quantity")}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    value={item.pricePerUnit || ""}
                    onChange={(e) =>
                      handleInputChange(e, index, "pricePerUnit")
                    }
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="p-2 border flex flex-row items-center ">
                  <span>₹</span>
                  <input
                    type="text"
                    id="rowtotal"
                    value={item.amount || ""}
                    readOnly
                    className="w-full p-1 ml-3 border rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />
        <div className="flex justify-end flex-row">
        <button type="button" id="deleteRow" onClick={handleDeleteRow} className="hidden text-white bg-gradient-to-r  from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete Row</button>

        <button
          type="button"
          onClick={handleAddRow}
          className="py-2 px-4 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm text-center me-2 mb-2"
        >
          Add Row
        </button>

        </div>

        <div className="flex justify-between mt-5 total-section">
          <div className="tax-summary">
            {gsttype ? (
              <div className="normalgst">
                <span>
                  SGST @9%: ₹ {gstamt ? (gstamt / 2).toFixed(2) : "0"}{" "}
                </span><br/>
                <span>
                  CGST @9%: ₹ {gstamt ? (gstamt / 2).toFixed(2) : "0"}{" "}
                </span>
              </div>
            ) : (
              <p>IGST @18%: ₹ {gstamt}</p>
            )}
          </div>
          <div className="total-amount inline-block relative overflow-hidden pb-10 w-[18vw]">
            <p>
              Sub Total: ₹
              <input
                placeholder="Sub total"
                type="text"
                id="subtotal"
                ref={subtotalamt}
                readOnly
                className="w-[10vw] text-right p-2 border rounded"
              />
            </p>
            <p>
              Total Tax: ₹
              <input
                type="text"
                id="taxtotal"
                value={gstamt || "0"}
                readOnly
                className="w-[10vw] text-right p-2 border rounded"
              />
            </p>
            <hr />
            <input
              placeholder="Total amount"
              type="text"
              id="total"
              ref={totalamt}
              readOnly
              className="w-[16vw] text-right p-2 border rounded"
            />
            
          </div>
          
        </div>
        <button onClick={handleSave} className="text-white mr-5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>
        <NavLink to="/viewInvoice">
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          View
          </span>
          </button>        
          </NavLink>

       

      </form>
    </div>
  );
};

export default Invoice;
