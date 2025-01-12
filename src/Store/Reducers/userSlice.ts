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
    gstno: '',
    address: '',
    state: '',
    phone: '',
    email: '',
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
        gstno,
        address,
        state: userState,
        phone,
        email,
      } = action.payload;
      state.name = name;
      state.company = company;
      state.gstno = gstno;
      state.address = address;
      state.state = userState;
      state.phone = phone;
      state.email = email;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
