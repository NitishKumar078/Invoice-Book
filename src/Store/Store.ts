import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user/userSlice';

const Store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default Store;
