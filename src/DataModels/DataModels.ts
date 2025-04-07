/* ################################################################################################

# THIS FILE CONSIST DATA FORMATION FOR DATA_STORING FOR ALL NEW INVOICE'S
  ------------------------------------------------------------------------

1. tableItem
  - This contains all the information for each row of ablout item while creation.

2. invoiceItem
  - This raps the all necessary information of the invoice including the tableInfo(tableItem)  

################################################################################################## */

export interface TableItem {
  id: number;
  item: string;
  hsnCode: string;
  quantity?: string;
  unit: string;
  price?: string;
  amount?: string;
}

export interface invoiceItem {
  invoiceId: string;
  contact: string | null;
  vehicleno: string;
  E_waybillno: string;
  Idate: string;
  company: string;
  gstid: string;
  cno: string;
  cadress: string;
  tableData: TableItem[];
  gsttype: boolean;
  taxAmount: number;
  subtotalamt: string;
  totalAmount: number;
}

export type Customer = {
  name?: string;
  company?: string;
  email?: string;
  address?: string;
  state?: string;
  contactNo?: string;
  gstinNo?: string;
  label?: string;
  link?: string;
};

export interface User {
  user: string;
  company: string;
  gstno: string;
  address: string;
  state: string;
}

export interface option {
  value: string;
  label: string;
}
