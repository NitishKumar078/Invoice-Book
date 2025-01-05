import { Customer } from '@/DataModels/DataModels';
import { Item } from '@/DataModels/DataModels';

export const Customers: Customer[] = [
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
    state: 'IN',
    contactNo: '987-654-3210',
    gstinNo: '0987654321ZYXWV',
  },
  // Add more customers as needed
];

export const dummyItems: Item[] = [
  {
    itemId: 1,
    name: 'Item 1',
    description: 'Description for Item 1',
    quantity: 2,
    price: 50,
    hsncode: 0,
    unit: 'kg',
  },
  {
    itemId: 2,
    name: 'Item 2',
    description: 'Description for Item 2',
    quantity: 1,
    price: 150,
    hsncode: 0,
    unit: 'lit',
  },
  {
    itemId: 3,
    name: 'Item 3',
    description: 'Description for Item 3',
    quantity: 3,
    price: 30,
    hsncode: 3,
    unit: 'pcs',
  },
  {
    itemId: 3,
    name: 'Item 3',
    description: 'Description for Item 3',
    quantity: 3,
    price: 30,
    hsncode: 4,
    unit: 'pcs',
  },
  // Add more items as needed
];
