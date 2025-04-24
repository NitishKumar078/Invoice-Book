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
    BankName: '',
    AccountNo: '',
    IFSC_code: '',
    AccountName: '',
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
        AccountNo,
        IFSC_code,
        BankName,
        AccountName,
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
      state.BankName = BankName;
      state.AccountNo = AccountNo;
      state.IFSC_code = IFSC_code;
      state.AccountName = AccountName;

      // Persist updated user to localStorage
      localStorage.setItem('userInfo', JSON.stringify(state));
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
