/* ################################################################################################

# THIS FILE CONSIST DATA FORMATION FOR DATA_STORING FOR ALL NEW INVOICE'S
  ------------------------------------------------------------------------

1. tableItem
  - This contains all the information for each row of ablout item while creation.

2. invoiceItem
  - This raps the all necessary information of the invoice including the tableInfo(tableItem)  

################################################################################################## */

class tableItem {
  id: number;
  itemName: string;
  quantity: string;
  unit: string;
  pricePerUnit: string;
  amount: string;

  constructor(
    id: number = 1,
    itemName: string = "",
    quantity: string = "",
    unit: string = "",
    pricePerUnit: string = "",
    amount: string = ""
  ) {
    this.id = id;
    this.itemName = itemName;
    this.quantity = quantity;
    this.unit = unit;
    this.pricePerUnit = pricePerUnit;
    this.amount = amount;
  }
}

class invoiceItem {
  id: string;
  date: string;
  name: string;
  gstNo: string;
  contactno: string;
  address: string;
  tableInfo: tableItem[];
  gstamt: number;
  tamt: number;

  constructor(
    id: string,
    date: string,
    name: string,
    gstNo: string,
    contactno: string,
    address: string,
    tableInfo: tableItem[],
    gstamt: number,
    tamt: number
  ) {
    this.id = id;
    this.date = date;
    this.name = name;
    this.gstNo = gstNo;
    this.contactno = contactno;
    this.address = address;
    this.tableInfo = tableInfo;
    this.gstamt = gstamt;
    this.tamt = tamt;
  }
}

export { tableItem, invoiceItem };
