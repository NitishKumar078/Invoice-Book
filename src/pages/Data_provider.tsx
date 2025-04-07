import { Customer } from "@/DataModels/DataModels";
import { TableItem } from "@/DataModels/DataModels";

export const Customers: Customer[] = [
  {
    name: "XYZ Ltd",
    address: "123 Main St, Springfield",
    state: "IL",
    company: "XYZ Ltd",
    contactNo: "123-456-7890",
    gstinNo: "1234567890ABCDE",
  },
  {
    name: "Jane Smith",
    address: "456 Elm St, Shelbyville",
    state: "Karnataka",
    contactNo: "987-654-3210",
    gstinNo: "0987654321ZYXWV",
  },
  // Add more customers as needed
];

export const dummyItems: TableItem[] = [
  {
    id: 0,
    item: "Add Item",
    quantity: "0",

    hsnCode: "0",
    unit: "none",
  },
  {
    id: 1,
    item: "Item 1",
    quantity: "2",

    hsnCode: "0",
    unit: "kg",
  },
  {
    id: 2,
    item: "Item 2",
    quantity: "1",

    hsnCode: "0",
    unit: "lit",
  },
  {
    id: 3,
    item: "Item 3",
    quantity: "3",

    hsnCode: "3",
    unit: "pcs",
  },
  {
    id: 3,
    item: "Item 6",
    quantity: "3",

    hsnCode: "4",
    unit: "pcs",
  },
  {
    id: 4,
    item: "Itgfdgdfgdfgem3 4",
    quantity: "3",

    hsnCode: "4",
    unit: "pcs",
  },
  {
    id: 5,
    item: "Item 5",
    quantity: "3",

    hsnCode: "4",
    unit: "pcs",
  },
  // Add more items as needed
];
