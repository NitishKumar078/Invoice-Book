import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the selected headers setting
export interface SettingInfo {
  selectedHeaders: { value: string; label: string }[];
}

// Function to fetch setting info from localStorage or initialize it
const fetchSettingInfoFromLocalStorage = (): SettingInfo => {
  const settingInfo = localStorage.getItem('settingInfo');
  if (settingInfo) {
    return JSON.parse(settingInfo);
  }

  // Default setting object
  const defaultSetting: SettingInfo = {
    selectedHeaders: [],
  };

  // Save default setting to localStorage
  localStorage.setItem('settingInfo', JSON.stringify(defaultSetting));
  return defaultSetting;
};

// Initial state is fetched from localStorage if available
const initialState: SettingInfo = fetchSettingInfoFromLocalStorage();

const settingInfoSlice = createSlice({
  name: 'settingInfo',
  initialState,
  reducers: {
    // Update selected headers
    updateSelectedHeaders: (
      state,
      action: PayloadAction<{ value: string; label: string }[]>
    ) => {
      state.selectedHeaders = action.payload;
      // Persist updated setting to localStorage
      localStorage.setItem('settingInfo', JSON.stringify(state));
    },
  },
});

export const { updateSelectedHeaders } = settingInfoSlice.actions;
export default settingInfoSlice.reducer;
