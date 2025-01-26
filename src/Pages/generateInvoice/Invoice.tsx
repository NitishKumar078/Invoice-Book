import React, { useState, useEffect, useRef } from 'react';
import { tableItem, invoiceItem } from '../../DataModels/DataModels';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import DialogBox from '@/Components/Dialogbox/DialogBox';
import { Customer, User } from '@/DataModels/DataModels';
import { useSelector } from 'react-redux';
import SelectCustomer from '@/Components/ui/SelectCustomer';
import SelectItem from '@/Components/ui/SelectItem';
import { CircleAlert } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addInvoice } from '@/Store/Reducers/InvoiceSlice';

interface InvoiceProps {}

const Invoice: React.FC<InvoiceProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [warning, setWarning] = useState('');
  const [description, setDescription] = useState('');
  const [tableData, setTableData] = useState<tableItem[]>([]);
  const [rowIndx, setRowIndx] = useState<number>(1);
  const [gsttype, setgsttype] = useState<boolean>(true); // if gsttype--> true then normal gst(18%) orelse igst(18%)
  const [gstamt, setgstamt] = useState<number | null>(null);
  const subtotalamt = useRef<HTMLInputElement>(null);
  const totalamt = useRef<HTMLInputElement>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const user = useSelector((state: { user: User }) => state.user);
  const [Customers, setCustomers] = useState<Customer[]>([]);
  let customer = useSelector(
    (state: { customersDB: any; customer: Customer[] }) =>
      state?.customersDB.customers
  );
  const [items, setitems] = useState<tableItem[]>([]);
  let itemList = useSelector(
    (state: { ItemsDB: any; Items: tableItem[] }) => state?.ItemsDB.Items
  );
  useEffect(() => {
    // Initialize tableData with one empty row
    const initialItem: tableItem = {
      id: String(rowIndx),
      item: '',
      hsnCode: '',
      quantity: '',
      unit: '',
      price: '',
      amount: '',
    };
    setTableData([initialItem]);
    setCustomers(customer);
    const AddCustomer: Customer = {
      name: 'Add Customer',
      label: 'Add Customer',
      customer_id: '',
      state: '',
      phone: '',
    };
    const AddItem: tableItem = {
      item: 'Add Item',
      id: '',
      hsnCode: '',
      unit: '',
    };
    customer = [AddCustomer, ...customer];
    itemList = [AddItem, ...itemList];
    setCustomers(customer);
    setitems(itemList);
  }, []);

  const ValidatingInteger = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (
      field === 'quantity' ||
      field === 'price' ||
      field === 'ContactNo' ||
      field === 'ewaybillno' ||
      field === 'hsnCode'
    ) {
      e.target.value = e.target.value
        .replace(/[^0-9.]/g, '')
        .replace(/(\..*)\./g, '$1');
    }
  };

  // Function to handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    field: string
  ) => {
    // Validating the data type for quantity and price
    ValidatingInteger(e, field);

    // Update the specific field in the row
    const newTableData = [...tableData];
    if (field === 'quantity' || field === 'price' || field === 'hsnCode') {
      newTableData[rowIndex][field] = e.target.value;

      // Update the amount field if quantity and price are present
      const quantity = parseFloat(newTableData[rowIndex].quantity || '0');
      const price = parseFloat(newTableData[rowIndex].price || '0');
      newTableData[rowIndex].amount = (quantity * price).toFixed(2);
    } else if (field === 'item' || field === 'unit') {
      newTableData[rowIndex][field] = e.target.value;
    }

    // Update the state with new table data
    setTableData(newTableData);
  };

  // Function to add a new row
  const handleAddRow = () => {
    const newRow: tableItem = {
      id: String(rowIndx + 1),
      item: '',
      hsnCode: '',
      quantity: '',
      unit: '',
      price: '',
      amount: '',
    };
    setTableData([...tableData, newRow]);
    setRowIndx(rowIndx + 1); // Increment row index for next row

    if (rowIndx === 1) {
      const delerowEle = document.getElementById(`deleteRow`);
      if (delerowEle) delerowEle.style.display = 'block';
    }
  };

  const handleDeleteRow = () => {
    const newTableData = [...tableData];
    newTableData.pop();
    setTableData(newTableData);
    setRowIndx(rowIndx - 1);
    if (rowIndx === 2) {
      const delerowEle = document.getElementById(`deleteRow`);
      if (delerowEle) delerowEle.style.display = 'none';
    }
  };

  // Function to handle save action
  const getinvoicedata = () => {
    const Idate = (document.getElementById('Idata') as HTMLInputElement).value;
    const Iid = (document.getElementById('invoiceId') as HTMLInputElement)
      .value;
    if (!selectedCustomer) {
      setIsOpen(true);
      return null;
    } else {
      const cname = selectedCustomer?.name || '';
      const gstid = selectedCustomer?.gstinNo || '';
      const cno = selectedCustomer?.contactNo || '';
      const cadress = selectedCustomer?.address || '';
      const contact = selectedCustomer?.contactNo || null;
      const E_waybillno = (
        document.getElementById('E-waybillno') as HTMLInputElement
      ).value;
      const vehicleno = (
        document.getElementById('vehicleno') as HTMLInputElement
      ).value;
      const totalgstamt = gstamt || 0;
      const tamt =
        parseFloat(
          (document.getElementById('total') as HTMLInputElement).value
        ) || 0;
      const subtotalamt: string = (
        document.getElementById('subtotal') as HTMLInputElement
      ).value;
      const Idata: invoiceItem = {
        Iid,
        contact,
        vehicleno,
        E_waybillno,
        Idate,
        cname,
        gstid,
        cno,
        cadress,
        tableData,
        gsttype,
        totalgstamt,
        subtotalamt,
        tamt,
      };
      return Idata;
    }
  };

  const handleView = async (e: React.FormEvent) => {
    e.preventDefault();
    const ValidatedData = await DataValidation(e);
    console.log('passing data to view', ValidatedData);
    if (ValidatedData !== null) {
      navigate('/viewInvoice', { state: { ValidatedData } });
    }
  };

  async function DataValidation(e: React.FormEvent) {
    e.preventDefault();
    const invoicedata = getinvoicedata();
    if (invoicedata === null) {
      setIsOpen(true);
      setWarning('Warning');
      setDescription('Please Select the customer');
      return null;
    } else if (tableData.length >= 1) {
      // Validate required fields in table rows
      for (let i = 0; i < tableData.length; i++) {
        const row = tableData[i];

        if (
          !row.item ||
          !row.quantity ||
          !row.price ||
          !row.unit ||
          !row.hsnCode
        ) {
          setIsOpen(true);
          setWarning('Warning');
          setDescription('Please fill all required fields in the table');
          return null;
        }
      }
      return invoicedata;
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    const ValidatedData = await DataValidation(e);
    if (ValidatedData && ValidatedData !== null) {
      dispatch(addInvoice(ValidatedData));
      // navigate('/Create');
      console.log('this data should be saved', ValidatedData);
    }
  };

  useEffect(() => {
    let total = 0;
    // Calculation of the total amount
    tableData.forEach((item) => {
      total += parseFloat(item.amount || '0');
    });

    if (subtotalamt.current && totalamt.current) {
      subtotalamt.current.value = total.toFixed(2); // Update the value of the input field
      setgstamt(parseFloat(((total * 18) / 100).toFixed(2)));
      totalamt.current.value = (total * 1.18).toFixed(2);
    }
  }, [tableData]); // Depend on tableData to update when it changes

  return (
    <>
      {user.company ? (
        <div className="createcart mx-auto p-5  left-[calc(16rem)] bg-white shadow-lg  right-[5px] absolute block transition-all duration-300 invoice-container">
          <div className="flex justify-between border-b pb-2 invoice-header">
            <div className="w-[60%] company-details">
              <h2 className="text-2xl font-bold">{user.company}</h2>
              <p>
                {user.address}
                <br />
                GSTIN: {user.gstno}
                <br />
                State: {user.state}
              </p>
            </div>
            <div className="text-right invoice-title">
              <h1 className="text-4xl">Sales Invoice</h1>
            </div>
          </div>

          <form>
            <div className="flex justify-between mt-5 billing-info">
              <div className="bill-to ">
                <h3 className="text-lg font-semibold">Bill To</h3>
                <SelectCustomer
                  setSelectedCustomer={setSelectedCustomer}
                  setgsttype={setgsttype}
                  ListCustomers={Customers}
                />
                <br />
                <div className="flex flex-col gap-2 pt-2">
                  <div>
                    <strong>Address:</strong>{' '}
                    {selectedCustomer ? selectedCustomer.address || '' : ''}
                  </div>
                  <div>
                    <strong>State:</strong> {selectedCustomer?.state || ''}
                  </div>
                  {selectedCustomer?.contactNo && (
                    <div>
                      <strong>Contact No:</strong> {selectedCustomer?.contactNo}
                    </div>
                  )}
                  <div>
                    <strong>GSTIN No:</strong> {selectedCustomer?.gstinNo || ''}
                  </div>
                </div>
              </div>
              <div className="invoice-details">
                <div>
                  <label htmlFor="E-waybillno" className="block">
                    E-Way Bill no.
                  </label>
                  {totalamt.current &&
                  parseInt(totalamt.current.value) >= 50000 ? (
                    <input
                      name="E-waybillno"
                      id="E-waybillno"
                      className="p-2 border rounded w-full"
                      onInput={(e) => {
                        ValidatingInteger(
                          e as React.ChangeEvent<HTMLInputElement>,
                          'ewaybillno'
                        );
                      }}
                      required
                    />
                  ) : (
                    <input
                      name="E-waybillno"
                      id="E-waybillno"
                      className="p-2 border rounded w-full"
                      onInput={(e) => {
                        ValidatingInteger(
                          e as React.ChangeEvent<HTMLInputElement>,
                          'ewaybillno'
                        );
                      }}
                    />
                  )}
                </div>

                <div>
                  <label htmlFor="vehicleno" className="block">
                    Vehicle No:
                  </label>
                  <input
                    name="vehicleno"
                    id="vehicleno"
                    className="p-2 border rounded w-full"
                    pattern="[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}"
                    title="Please enter a valid vehicle number (e.g., KA01AB1234)"
                    placeholder="KA01AB1234"
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.toUpperCase();
                    }}
                  />
                </div>
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
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>

            <table className="w-full mt-5 border-collapse invoice-table">
              <thead>
                <tr className="bg-gradient-to-r from-purple-400 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Item name</th>
                  <th className="p-2 border">HSN Code</th>
                  <th className="p-2 border">Unit</th>
                  <th className="p-2 border">Quantity</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Amount</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => (
                  <tr
                    key={`row-${index}`}
                    className="even:bg-gray-100 hover:bg-purple-200 transition-all duration-300"
                  >
                    <td className="p-2 border">{item.id}</td>
                    <td className="p-2 border">
                      <SelectItem
                        setTableData={setTableData}
                        ListItems={items}
                        index={index}
                        tableData={tableData}
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        key={`hsnCode-${index}`}
                        type="text"
                        value={item.hsnCode}
                        onChange={(e) => handleInputChange(e, index, 'hsnCode')}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        key={`unit-${index}`}
                        type="text"
                        value={item.unit}
                        onChange={(e) => handleInputChange(e, index, 'unit')}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        key={`quantity-${index}`}
                        type="text"
                        value={item.quantity}
                        onChange={(e) =>
                          handleInputChange(e, index, 'quantity')
                        }
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        key={`price-${index}`}
                        type="text"
                        value={item.price || ''}
                        onChange={(e) => handleInputChange(e, index, 'price')}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-2 border flex flex-row items-center ">
                      <span>₹</span>
                      <input
                        type="text"
                        id="rowtotal"
                        value={item.amount || ''}
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
              <button
                type="button"
                id="deleteRow"
                onClick={handleDeleteRow}
                className="hidden text-white bg-gradient-to-r  from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Delete Row
              </button>

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
                      SGST @9%: ₹ {gstamt ? (gstamt / 2).toFixed(2) : '0'}{' '}
                    </span>
                    <br />
                    <span>
                      CGST @9%: ₹ {gstamt ? (gstamt / 2).toFixed(2) : '0'}{' '}
                    </span>
                  </div>
                ) : (
                  <p>IGST @18%: ₹ {gstamt}</p>
                )}
              </div>
              <div className="total-amount relative">
                <div className="flex justify-self-end items-center gap-2 m-1">
                  Sub Total: ₹
                  <input
                    placeholder="Sub total"
                    type="text"
                    id="subtotal"
                    ref={subtotalamt}
                    readOnly
                    className="w-[10vw] text-right p-2 border rounded"
                  />
                </div>
                <div className="flex justify-self-end items-center gap-2 m-1">
                  Total Tax: ₹
                  <input
                    type="text"
                    id="taxtotal"
                    value={gstamt || '0'}
                    readOnly
                    className="w-[10.5vw] text-right p-2 border rounded"
                  />
                </div>
                <hr />
                <div className="flex relative items-center gap-2 m-1">
                  <label htmlFor="total" className="block">
                    Total Amount: ₹
                  </label>
                  <input
                    placeholder="Total amount"
                    type="text"
                    id="total"
                    ref={totalamt}
                    readOnly
                    className="w-[12vw] text-right p-2 border rounded"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={(e) => {
                handleSave(e);
              }}
              className="text-white mr-5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Save
            </button>
            <NavLink
              to="/viewInvoice"
              onClick={(e) => {
                handleView(e);
              }}
            >
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  View
                </span>
              </button>
            </NavLink>
          </form>
          <DialogBox
            dialogOpen={isOpen}
            setDialogOpen={setIsOpen}
            warningTitle={warning}
            dialogDescription={description}
          />
        </div>
      ) : (
        <div className="z-50 fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">
              warning <CircleAlert className="inline" />
            </h2>
            <p className="mb-6">
              Before generating the invoice, please provide your information.
            </p>
            <Link
              to="/setting"
              className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              OK
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Invoice;
