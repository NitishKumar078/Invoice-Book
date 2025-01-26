import { configureStore } from '@reduxjs/toolkit';
import CustomersReducer from './Reducers/customersSlice';
import InvoiceReducer from './Reducers/InvoiceSlice';
import UserReducer from './Reducers/userSlice';
import ItemReducer from './Reducers/ItemsSlice';

const Store = configureStore({
  reducer: {
    customersDB: CustomersReducer,
    invoiceDB: InvoiceReducer,
    ItemsDB: ItemReducer,
    user: UserReducer,
  },
});

export default Store;
