import { createSlice } from "@reduxjs/toolkit";
import { invoiceItem } from "@/DataModels/DataModels";

const initialState: invoiceItem[] = [
  {
    invoiceId: "INV-001",
    contact: "9876543210",
    vehicleno: "MH12AB1234",
    E_waybillno: "EWB001",
    Idate: "2023-03-01",
    company: "ABC Corp",
    gstid: "27AAAPL1234C1ZV",
    cno: "9876543210",
    cadress: "123 Main Street, Mumbai",
    tableData: [
      {
        id: 1,
        item: "Laptop",
        hsnCode: "8471",
        quantity: "2",
        unit: "pcs",
        price: "1200.00",
        amount: "2400.00",
      },
    ],
    gsttype: true,
    taxAmount: 250.75,
    subtotalamt: "1000.00",
    totalAmount: 1250.5,
  },
  {
    invoiceId: "INV-002",
    contact: "9876543211",
    vehicleno: "MH12AB5678",
    E_waybillno: "EWB002",
    Idate: "2023-03-02",
    company: "XYZ Ltd",
    gstid: "29AAAPL5678D1ZW",
    cno: "9876543211",
    cadress: "456 Park Avenue, Bangalore",
    tableData: [
      {
        id: 1,
        item: "Laptop",
        hsnCode: "8471",
        quantity: "2",
        unit: "pcs",
      },
    ],
    gsttype: true,
    taxAmount: 150.25,
    subtotalamt: "800.00",
    totalAmount: 950.0,
  },
];

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.findIndex(
        (invoice) => invoice.invoiceId === action.payload.invoiceId
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteInvoice: (state, action) => {
      return state.filter(
        (invoice) => invoice.invoiceId !== action.payload.invoiceId
      );
    },
  },
});

export const { addInvoice, updateInvoice, deleteInvoice } =
  invoiceSlice.actions;
export default invoiceSlice.reducer;
