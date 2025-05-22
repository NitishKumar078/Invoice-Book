export interface TableItem {
  id?: number;
  item: string;
  hsnCode: string;
  quantity?: string;
  unit: string;
  price?: string;
  amount?: string;
  customUnit?: string;
}

export interface invoiceItem {
  invoiceId: string;
  customerName: string;
  phoneNo: string | null;
  vehicleno: string;
  E_waybillno: string;
  Idate: string;
  company: string;
  gstid: string;
  cadress: string;
  tableData: TableItem[];
  gsttype: boolean;
  taxAmount: string;
  subtotalamt: string;
  totalAmount: string;
}

export type Customer = {
  name: string;
  company: string;
  email?: string;
  address: string;
  state: string;
  phoneNo?: string;
  gstNo: string;
  label?: string;
  link?: string;
  customState: string;
};

export interface User {
  name: string;
  company: string;
  gstNo: string;
  address: string;
  state: string;
  phoneNo?: string;
  email?: string;
  customState?: string;
  BankName: string;
  AccountNo: string;
  IFSC_code: string;
  AccountName?: string;
}

export interface option {
  value: string;
  label: string;
}
