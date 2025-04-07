import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./Slice/ItemSlice";
import userReducer from "./Slice/UserSlice";
import invoiceReducer from "./Slice/InvoiceSlice";
import customerReducer from "./Slice/CustomerSlice";

const Store = configureStore({
  reducer: {
    user: userReducer,
    invoice: invoiceReducer,
    customer: customerReducer,
    item: itemReducer,
  },
});

export default Store;
