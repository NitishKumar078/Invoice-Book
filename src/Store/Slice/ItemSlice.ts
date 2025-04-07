import { createSlice } from "@reduxjs/toolkit";
import { TableItem } from "@/DataModels/DataModels";

const initialState: TableItem[] = [
  {
    id: 1,
    item: "Laptop",
    hsnCode: "8471",
    quantity: "2",
    unit: "pcs",
    price: "1200.00",
    amount: "2400.00",
  },
  {
    id: 2,
    item: "Mouse",
    hsnCode: "8471",
    quantity: "5",
    unit: "pcs",
    price: "25.00",
    amount: "125.00",
  },
];

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    updateItem: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addItem, updateItem, deleteItem } = itemSlice.actions;
export default itemSlice.reducer;
