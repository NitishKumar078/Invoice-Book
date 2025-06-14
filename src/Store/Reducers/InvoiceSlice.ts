import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDataBase } from '@/utils/indexedDB';
import { invoiceItem } from '@/DataModels/DataModels';

const invoiceStore = import.meta.env.VITE_INVOICESTORE;

interface InvoiceState {
  invoices: invoiceItem[];
}

// Function to fetch initial state from IndexedDB
const fetchInvoicesFromStorage = async (): Promise<invoiceItem[]> => {
  try {
    const invoices = await getDataBase.getAll(invoiceStore);
    return invoices || [];
  } catch (error) {
    console.error('Failed to load initial invoices:', error);
    return [];
  }
};

// Initialize state with empty invoices array
let _invoices: invoiceItem[] = [];

const initialState: InvoiceState = {
  get invoices() {
    return _invoices;
  },
  set invoices(value: invoiceItem[]) {
    _invoices = value;
  },
};

async function initializeState() {
  await fetchInvoicesFromStorage()
    .then((invoices) => {
      initialState.invoices = invoices || [];
    })
    .catch((error) => {
      console.error('Failed to initialize invoices:', error);
    });
}

initializeState();

const invoicesSlice = createSlice({
  name: invoiceStore,
  initialState,
  reducers: {
    setInvoices: (state, action: PayloadAction<invoiceItem[]>) => {
      state.invoices = action.payload;
    },
    addInvoice: (state, action: PayloadAction<invoiceItem>) => {
      state.invoices.push(action.payload);
      getDataBase.add(invoiceStore, action.payload).catch((error) => {
        console.error('Failed to add invoice to IndexedDB:', error);
      });
    },
    updateInvoice: (state, action: PayloadAction<invoiceItem>) => {
      const index = state.invoices.findIndex(
        (i) => i.invoiceId === action.payload.invoiceId
      );
      if (index !== -1) {
        state.invoices[index] = action.payload;
        getDataBase.update(invoiceStore, action.payload).catch((error) => {
          console.error('Failed to update invoice in IndexedDB:', error);
        });
      }
    },
    deleteInvoice: (state, action: PayloadAction<string>) => {
      state.invoices = state.invoices.filter(
        (i) => i.invoiceId !== action.payload
      );
      getDataBase.delete(invoiceStore, action.payload).catch((error) => {
        console.error('Failed to delete invoice from IndexedDB:', error);
      });
    },
  },
});

export const { setInvoices, addInvoice, updateInvoice, deleteInvoice } =
  invoicesSlice.actions;

export default invoicesSlice.reducer;
