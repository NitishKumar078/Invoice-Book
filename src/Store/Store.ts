import { configureStore } from '@reduxjs/toolkit';
import customersReducer from './Reducers/customersSlice';
import userReducer from './Reducers/userSlice';
import ItemReducer from './Reducers/ItemsSlice';

const Store = configureStore({
  reducer: {
    customersDB: customersReducer,
    ItemsDB: ItemReducer,
    user: userReducer,
  },
});

export default Store;
