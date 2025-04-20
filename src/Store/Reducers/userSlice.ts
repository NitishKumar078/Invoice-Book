import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/DataModels/DataModels';

// Function to fetch user info from localStorage
const fetchUserInfoFromLocalStorage = (): User => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return {
    name: '',
    company: '',
    gstNo: '',
    address: '',
    state: '',
    phoneNo: '',
    email: '',
    customState: '',
  };
};

// Initial state is fetched from localStorage if available
const initialState: User = fetchUserInfoFromLocalStorage();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Update user information
    updateUser: (state, action: PayloadAction<User>) => {
      const {
        name,
        company,
        gstNo,
        address,
        state: userState,
        phoneNo,
        email,
        customState,
      } = action.payload;
      state.name = name;
      state.company = company;
      state.gstNo = gstNo;
      state.address = address;
      state.state = userState;
      state.phoneNo = phoneNo;
      state.email = email;
      state.customState = customState;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
