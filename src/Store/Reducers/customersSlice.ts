import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDataBase } from '@/utils/indexedDB';
import { Customer } from '@/DataModels/DataModels';
const customerStore = import.meta.env.VITE_CUSTOMERSTORE;

interface CustomerState {
  customers: Customer[];
}

// Function to fetch initial state from IndexedDB
const fetchCustomersFromStorage = async (): Promise<Customer[]> => {
  try {
    const customers = await getDataBase.getAll(customerStore);
    return customers || [];
  } catch (error) {
    console.error('Failed to load initial customers:', error);
    return [];
  }
};

// Initialize state with empty customers array
const initialState: CustomerState = {
  customers: [],
};

// Fetch initial state from IndexedDB
const customers = await fetchCustomersFromStorage();
initialState.customers = customers;

const customersSlice = createSlice({
  name: customerStore,
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
    },
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
      getDataBase.add(customerStore, action.payload).catch((error) => {
        console.error('Failed to add customer to IndexedDB:', error);
      });
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex(
        (c) => c.company === action.payload.company
      );
      if (index !== -1) {
        state.customers[index] = action.payload;
        getDataBase.update(customerStore, action.payload).catch((error) => {
          console.error('Failed to update customer in IndexedDB:', error);
        });
      }
    },
    deleteCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter(
        (c) => c.company !== action.payload
      );
      getDataBase.delete(customerStore, action.payload).catch((error) => {
        console.error('Failed to delete customer from IndexedDB:', error);
      });
    },
  },
});

export const { setCustomers, addCustomer, updateCustomer, deleteCustomer } =
  customersSlice.actions;

export default customersSlice.reducer;
