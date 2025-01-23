/* ################################################################################################

# THIS FILE CONSIST DATA FORMATION FOR DATA_STORING FOR ALL NEW INVOICE'S
  ------------------------------------------------------------------------

1. tableItem
  - This contains all the information for each row of ablout item while creation.

2. invoiceItem
  - This raps the all necessary information of the invoice including the tableInfo(tableItem)  

################################################################################################## */

export interface tableItem {
  id: number;
  item: string;
  hsnCode: string;
  quantity: string;
  unit: string;
  price: string;
  amount: string;
}

export interface invoiceItem {
  Iid: string;
  contact: string | null;
  vehicleno: string;
  E_waybillno: string;
  Idate: string;
  cname: string;
  gstid: string;
  cno: string;
  cadress: string;
  tableData: tableItem[];
  gsttype: boolean;
  totalgstamt: number;
  subtotalamt: string;
  tamt: number;
}

export type Customer = {
  customer_id: string;
  name?: string;
  label?: string;
  address?: string;
  state: string;
  contactNo?: string;
  gstinNo?: string;
  phone: string;
  company?: string;
};

export interface User {
  name: string;
  company: string;
  phone: string;
  email: string;
  gstno: string;
  address: string;
  state: string;
}
