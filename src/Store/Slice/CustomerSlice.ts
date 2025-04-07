import { createSlice } from "@reduxjs/toolkit";
import { Customer } from "@/DataModels/DataModels";

const initialState: Customer[] = [
  {
    name: "John Doe",
    company: "ABC Corp",
    email: "john.doe@abccorp.com",
    address: "123 Main Street, Mumbai",
    state: "Maharashtra",
    contactNo: "9876543210",
    gstinNo: "27AAAPL1234C1ZV",
  },
  {
    name: "Jane Smith",
    company: "XYZ Ltd",
    email: "jane.smith@xyz.com",
    address: "456 Park Avenue, Bangalore",
    state: "Karnataka",
    contactNo: "9876543211",
    gstinNo: "29AAAPL5678D1ZW",
  },
];

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      state.push(action.payload);
    },
    updateCustomer: (state, action) => {
      const index = state.findIndex(
        (customer) => customer.name === action.payload.name
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteCustomer: (state, action) => {
      return state.filter((customer) => customer.name !== action.payload.name);
    },
  },
});

export const { addCustomer, updateCustomer, deleteCustomer } =
  customerSlice.actions;
export default customerSlice.reducer;
