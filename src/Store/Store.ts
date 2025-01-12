import { configureStore } from '@reduxjs/toolkit';
import customersReducer from './Reducers/customersSlice';
import userReducer from './Reducers/userSlice';

const Store = configureStore({
  reducer: {
    customersDB: customersReducer,
    user: userReducer,
  },
});

export default Store;
