import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/DataModels/DataModels';

const intailState: User = {
  user: 'nitish kumar M',
  company: 'Google LLC',
  gstno: '123456789',
  address: 'Bangalore',
  state: 'Karnataka',
};

const userSlice = createSlice({
  name: 'user',
  initialState: intailState,
  reducers: {
    // sample for creating the  reducer function for updating the user
    // updateUser: (state: User, action: any) => {
    //   state.user = action.payload.user;
    //   state.company = action.payload.company;
    //   state.gstno = action.payload.gstno;
    //   state.address = action.payload.address;
    //   state.state = action.payload.state;
    // },
  },
});

export default userSlice.reducer;
