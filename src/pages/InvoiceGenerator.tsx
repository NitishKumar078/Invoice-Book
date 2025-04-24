import React, { useState, useEffect, useRef } from 'react';
import { TableItem, invoiceItem } from '@/DataModels/DataModels';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Customer, User } from '@/DataModels/DataModels';
import { useDispatch, useSelector } from 'react-redux';
import SelectCustomer from '@/components/ui/SelectCustomer';
import SelectItem from '../components/ui/SelectItem';
import {
  AddCustomerDialogBox,
  AddIteamDialogBox,
  AddUserDialogBox,
  DialogBox,
} from '../components/DialogBox';
import { Info } from 'lucide-react';
import { addInvoice, updateInvoice } from '@/Store/Reducers/InvoiceSlice';
import { selectCustomer } from '@/Store/Selectors/Selectors';

interface InvoiceProps {}

const InvoiceGenerator: React.FC<InvoiceProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [addIteamDialogBox, setIteamDialogBox] = useState(false);
  const [addUserDialogBox, setaddUserDialogBox] = useState(false);
  const [addCustomerDialogBox, setCustomerDialogBox] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [warning, setWarning] = useState('');
  const [description, setDescription] = useState('');
  const [tableData, setTableData] = useState<TableItem[]>(
    location.state?.invoicedata.tableData || []
  );
  const isEditMode = location.state?.isEditMode || false;
  const [rowIndx, setRowIndx] = useState<number>(1);
  const [gsttype, setgsttype] = useState<boolean>(
    location.state?.invoicedata.gsttype || true
  ); // if gsttype--> true then normal gst(18%) orelse igst(18%)
  const [gstamt, setgstamt] = useState<number | null>(
    location.state?.invoicedata.totalgstamt || null
  );
  const subtotalamt = useRef<HTMLInputElement>(
    location.state?.invoicedata.subtotalamt || null
  );
  const totalamt = useRef<HTMLInputElement>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const user = useSelector((state: { user: User }) => state.user || []);
  const customerList = useSelector(selectCustomer);

  useEffect(() => {
    // check the user info
    if (user.name === '' && user.company === '') {
      setIsOpen(true);
      setWarning('Warning');
      setDescription('Please fill the user info first');
      setaddUserDialogBox(true);
    }
    // Initialize tableData with one empty row
    const initialItem: TableItem = {
      id: rowIndx,
      item: '',
      hsnCode: '',
      quantity: '',
      unit: '',
      price: '',
      amount: '',
      customUnit: '',
    };
    if (tableData.length === 0) {
      setTableData([initialItem]);
    }
    if (isEditMode) {
      customerList.forEach((customer) => {
        if (customer.company === location.state?.invoicedata.company) {
          setSelectedCustomer(customer);
        }
      });
    }
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
    const newRow: TableItem = {
      id: rowIndx + 1,
      item: '',
      hsnCode: '',
      quantity: '',
      customUnit: '',
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
    const invoiceId = (document.getElementById('invoiceId') as HTMLInputElement)
      .value;
    if (!selectedCustomer) {
      setIsOpen(true);
      return null;
    } else {
      const customerName = selectedCustomer?.name || '';
      const company = selectedCustomer?.company || '';
      const gstid = selectedCustomer?.gstNo || '';
      const cadress = selectedCustomer?.address || '';
      const phoneNo = selectedCustomer?.phoneNo || null;
      const E_waybillno = (
        document.getElementById('E-waybillno') as HTMLInputElement
      ).value;
      const vehicleno = (
        document.getElementById('vehicleno') as HTMLInputElement
      ).value;
      const taxAmount = gstamt || 0;
      const totalAmount =
        parseFloat(
          (document.getElementById('total') as HTMLInputElement).value
        ) || 0;
      const subtotalamt: string = (
        document.getElementById('subtotal') as HTMLInputElement
      ).value;
      const Idata: invoiceItem = {
        invoiceId,
        customerName,
        vehicleno,
        E_waybillno,
        Idate,
        company,
        gstid,
        phoneNo,
        cadress,
        tableData,
        gsttype,
        taxAmount,
        subtotalamt,
        totalAmount,
      };
      return Idata;
    }
  };

  const handleView = async (e: React.FormEvent) => {
    e.preventDefault();
    const ValidatedData = await DataValidation(e);
    console.log('passing data to view', ValidatedData);
    if (ValidatedData !== null) {
      navigate('/invoice/viewInvoice', { state: { ValidatedData } });
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
    } else if (
      invoicedata.E_waybillno === '' &&
      invoicedata.totalAmount >= 50000
    ) {
      setIsOpen(true);
      setWarning('Warning');
      setDescription('Please Enter the E-waybill number');
      return null;
    } else if (invoicedata.vehicleno === '') {
      setIsOpen(true);
      setWarning('Warning');
      setDescription('Please Enter the vehicle number');
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
      navigate('/listInvoices');
      if (isEditMode) {
        dispatch(updateInvoice(ValidatedData));
      } else {
        dispatch(addInvoice(ValidatedData));
      }
      console.info('--> Invoice Data', ValidatedData);
    }
  };

  useEffect(() => {
    let total = 0;
    // Calculation of the total amount
    tableData.forEach((item) => {
      total += parseFloat(item?.amount ?? '0');
    });

    if (subtotalamt.current && totalamt.current) {
      subtotalamt.current.value = total.toFixed(2); // Update the value of the input field
      setgstamt(parseFloat(((total * 18) / 100).toFixed(2)));
      totalamt.current.value = (total * 1.18).toFixed(2);
    }
  }, [tableData]); // Depend on tableData to update when it changes

  return (
    <div className=" mx-auto p-5 bg-white shadow-lg   transition-all duration-300 invoice-container ">
      <div className="flex justify-between border-b pb-2 invoice-header">
        <div className="company-details">
          <h2 className="text-2xl font-bold">{user.company}</h2>
          <p>
            {user.address}
            <br />
            GSTIN: {user.gstNo}
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
              selectedCustomer={selectedCustomer}
              setgsttype={setgsttype}
              setCustomerDialogBox={setCustomerDialogBox}
            />
            <br />
          </div>
          <div className="invoice-details">
            <div className="flex flex-col gap-2  items-start">
              <label
                htmlFor="E-waybillno"
                className=" mb-0.5 items-center relative justify-center flex flex-row gap-2"
              >
                <b>E-Way Bill no. </b>
                <div className="group">
                  <span>
                    <Info className="inline size-4 cursor-pointer" />
                  </span>
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-sm rounded-md px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                    If the Total Amount is above 50,000. It's mandatory to fill
                    the E-waybillno
                  </div>
                </div>
              </label>
              {totalamt.current && parseInt(totalamt.current.value) >= 50000 ? (
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
                  defaultValue={location.state?.invoicedata.E_waybillno || ''}
                  placeholder="E-waybill no"
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
                  defaultValue={location.state?.invoicedata.E_waybillno || ''}
                  placeholder="E-waybill no"
                />
              )}
            </div>

            <div>
              <label htmlFor="vehicleno" className="block">
                <b>Vehicle No:</b>
              </label>
              <input
                name="vehicleno"
                id="vehicleno"
                className="p-2 border rounded w-full"
                pattern="[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}"
                title="Please enter a valid vehicle number (e.g., KA01AB1234)"
                placeholder="KA01AB1234"
                defaultValue={location.state?.invoicedata.vehicleno || ''}
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.value = target.value.toUpperCase();
                }}
              />
            </div>
            <div>
              <label htmlFor="invoiceId" className="block">
                <b>Invoice No:</b>
              </label>
              <input
                type="text"
                name="invoiceId"
                id="invoiceId"
                className="p-2 border rounded w-full"
                defaultValue={location.state?.invoicedata.invoiceId || ''}
              />
            </div>
            <div className="data mt-2">
              <label htmlFor="Idata" className="block">
                <b>Date:</b>
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

        <table className="w-full mt-2 border-collapse invoice-table">
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
                className="even:bg-gray-100 hover:bg-purple-100 transition-all duration-300"
              >
                <td className="p-2 border">{item.id}</td>
                <td className="p-2 border">
                  <SelectItem
                    setTableData={setTableData}
                    index={index}
                    tableData={tableData}
                    setIteamDialogBox={setIteamDialogBox}
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
                    value={item.unit === 'Other' ? item.customUnit : item.unit}
                    onChange={(e) => handleInputChange(e, index, 'unit')}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    key={`quantity-${index}`}
                    type="text"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(e, index, 'quantity')}
                    className=" p-1 border rounded"
                  />
                </td>
                <td className="p-2 border align-middle">
                  <div className="flex items-center gap-1">
                    <span>₹</span>
                    <input
                      key={`price-${index}`}
                      type="text"
                      value={item.price || ''}
                      onChange={(e) => handleInputChange(e, index, 'price')}
                      className="p-1 m-1 border rounded"
                    />
                  </div>
                </td>
                <td className="p-2 border align-middle">
                  <div className="flex items-center gap-1">
                    <span>₹</span>
                    <input
                      type="text"
                      id="rowtotal"
                      value={item.amount || ''}
                      readOnly
                      className="w-full p-1 m-1 border rounded"
                    />
                  </div>
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
                defaultValue={location.state?.invoicedata.subtotalamt || ''}
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
                defaultValue={location.state?.invoicedata.taxAmount || ''}
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
                defaultValue={location.state?.invoicedata.totalAmount || ''}
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
          {isEditMode ? 'Updata' : 'Save'}
        </button>
        <NavLink
          to="/viewInvoice"
          onClick={(e) => {
            handleView(e);
          }}
        >
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:font-bold dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
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
      <DialogBox
        dialogOpen={isOpen}
        setDialogOpen={setIsOpen}
        warningTitle={warning}
        dialogDescription={description}
      />
      {addCustomerDialogBox && (
        <AddCustomerDialogBox
          dialogOpen={addCustomerDialogBox}
          setDialogOpen={setCustomerDialogBox}
        />
      )}
      {addIteamDialogBox && (
        <AddIteamDialogBox
          dialogOpen={addIteamDialogBox}
          setDialogOpen={setIteamDialogBox}
        />
      )}
      {addUserDialogBox && (
        <AddUserDialogBox
          dialogOpen={addUserDialogBox}
          setDialogOpen={setaddUserDialogBox}
        />
      )}
    </div>
  );
};

export default InvoiceGenerator;
