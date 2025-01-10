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
    // Set a default blank state
    setUserDefaultState: (state) => {
      return initialState;
    },
  },
});

export const { updateUser, setUserDefaultState } = userSlice.actions;
export default userSlice.reducer;

// Thunk to load user data from localStorage
export const loadUserData = () => async (dispatch: any) => {
  try {
    const userInfo = fetchUserInfoFromLocalStorage();
    if (userInfo) {
      dispatch(updateUser(userInfo)); // Dispatch the action to update user info in the Redux state
    } else {
      dispatch(setUserDefaultState()); // If no data, reset to default state
    }
  } catch (error) {
    console.error('Failed to load user info from localStorage', error);
    dispatch(setUserDefaultState()); // Handle error and set default state
  }
};
