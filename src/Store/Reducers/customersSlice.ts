import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { customerDB } from '@/utils/indexedDB';
import { Customer } from '@/DataModels/DataModels';
const customerStore: string = process.env.CUSTOMERSTORE || 'null';

interface CustomerState {
  customers: Customer[];
}

// Function to fetch initial state from IndexedDB
const fetchCustomersFromStorage = async (): Promise<Customer[]> => {
  try {
    const customers = await customerDB.getAll(customerStore);
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
  name: 'customersDB',
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
    },
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
      customerDB.add(customerStore, action.payload).catch((error) => {
        console.error('Failed to add customer to IndexedDB:', error);
      });
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex(
        (c) => c.name === action.payload.name
      );
      if (index !== -1) {
        state.customers[index] = action.payload;
        customerDB.update(customerStore, action.payload).catch((error) => {
          console.error('Failed to update customer in IndexedDB:', error);
        });
      }
    },
    deleteCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter(
        (c) => c.name !== action.payload
      );
      customerDB.delete(customerStore, action.payload).catch((error) => {
        console.error('Failed to delete customer from IndexedDB:', error);
      });
    },
  },
});

export const { setCustomers, addCustomer, updateCustomer, deleteCustomer } =
  customersSlice.actions;

export default customersSlice.reducer;
