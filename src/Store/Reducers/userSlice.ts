import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/DataModels/DataModels';

// Function to fetch user info from localStorage or initialize it
const fetchUserInfoFromLocalStorage = (): User => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    return JSON.parse(userInfo);
  }

  // Default user object
  const defaultUser: User = {
    name: '',
    company: '',
    gstNo: '',
    address: '',
    state: '',
    phoneNo: '',
    email: '',
    customState: '',
  };

  // Save default user to localStorage
  localStorage.setItem('userInfo', JSON.stringify(defaultUser));
  return defaultUser;
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

      // Update state
      state.name = name;
      state.company = company;
      state.gstNo = gstNo;
      state.address = address;
      state.state = userState;
      state.phoneNo = phoneNo;
      state.email = email;
      state.customState = customState;

      // Persist updated user to localStorage
      localStorage.setItem('userInfo', JSON.stringify(state));
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
