import { createSelector } from 'reselect';
import type { RootState } from '../Store'; // Use the correct type for the Redux store
import { TableItem, Customer, invoiceItem } from '@/DataModels/DataModels'; // Ensure ItemState is imported

// Selector to get the item state from the Redux store
const selectItemState = (state: RootState) => state.ItemsDB; // Ensure this matches the slice name in your store
const selectInvoiceState = (state: RootState) => state.invoiceDB; // Ensure this matches the slice name in your store
const selectCustomerState = (state: RootState) => state.customersDB; // Ensure this matches the slice name in your store

// Memoized selector to get the list of items
export const selectItems = createSelector(
  [selectItemState],
  (itemState): TableItem[] => itemState?.Items || [] // Ensure `Items` is accessed correctly
);

export const selectInvoice = createSelector(
  [selectInvoiceState],
  (itemState): invoiceItem[] => itemState.invoices || [] // Ensure `Items` is accessed correctly
);

export const selectCustomer = createSelector(
  [selectCustomerState],
  (itemState): Customer[] => itemState.customers || [] // Ensure `Items` is accessed correctly
);
