import { Customer } from '@/DataModels/DataModels';
import { tableItem } from '@/DataModels/DataModels';

export const Customers: Customer[] = [
  {
    name: 'Add Customer',
    label: 'Add Customer',
  },
  {
    name: 'John Doe',
    address: '123 Main St, Springfield',
    state: 'IL',
    contactNo: '123-456-7890',
    gstinNo: '1234567890ABCDE',
  },
  {
    name: 'Jane Smith',
    address: '456 Elm St, Shelbyville',
    state: 'Karnataka',
    contactNo: '987-654-3210',
    gstinNo: '0987654321ZYXWV',
  },
  // Add more customers as needed
];

export const dummyItems: tableItem[] = [
  {
    id: 0,
    item: 'Add Item',
    quantity: '0',
    price: '0',
    hsnCode: '0',
    unit: 'none',
    amount: '0',
  },
  {
    id: 1,
    item: 'Item 1',
    quantity: '2',
    price: '50',
    hsnCode: '0',
    unit: 'kg',
    amount: '54',
  },
  {
    id: 2,
    item: 'Item 2',
    quantity: '1',
    price: '150',
    hsnCode: '0',
    unit: 'lit',
    amount: '54',
  },
  {
    id: 3,
    item: 'Item 3',
    quantity: '3',
    price: '30',
    hsnCode: '3',
    unit: 'pcs',
    amount: '54',
  },
  {
    id: 3,
    item: 'Item 6',
    quantity: '3',
    price: '30',
    hsnCode: '4',
    unit: 'pcs',
    amount: '54',
  },
  {
    id: 4,
    item: 'Itgfdgdfgdfgem3 4',
    quantity: '3',
    price: '30',
    hsnCode: '4',
    unit: 'pcs',
    amount: '54',
  },
  {
    id: 5,
    item: 'Item 5',
    quantity: '3',
    price: '30',
    hsnCode: '4',
    unit: 'pcs',
    amount: '54',
  },
  // Add more items as needed
];
