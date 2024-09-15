/* ################################################################################################

# THIS FILE CONSIST DATA FORMATION FOR DATA_STORING FOR ALL NEW INVOICE'S
  ------------------------------------------------------------------------

1. tableItem
  - This contains all the information for each row of ablout item while creation.

2. invoiceItem
  - This raps the all necessary information of the invoice including the tableInfo(tableItem)  

################################################################################################## */



class tableItem {
    constructor(id = 1, itemName = "", quantity = "", unit = "", pricePerUnit = "", amount = "") {
        this.id = id;
        this.itemName = itemName;
        this.quantity = quantity;
        this.unit = unit;
        this.price = pricePerUnit;
        this.amount = amount;
      }
  }


  class invoiceItem {
    constructor(id, date, name, gstNo, contactno, address, tableInfo, gstamt, tamt) {
      this.invoiceId = id;
      this.date = date;
      this.customer = name;
      this.gstno = gstNo;
      this.contactno = contactno;
      this.address = address;
      this.tableInfo = tableInfo;
      this.gstAmt = gstamt;
      this.totalAmt = tamt;
    }
  }
  
  export { tableItem, invoiceItem };

  