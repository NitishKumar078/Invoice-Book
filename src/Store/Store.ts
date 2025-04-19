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

// Define RootState type for the entire Redux state
export type RootState = ReturnType<typeof Store.getState>;

// Define AppDispatch type for dispatching actions
export type AppDispatch = typeof Store.dispatch;

export default Store;
