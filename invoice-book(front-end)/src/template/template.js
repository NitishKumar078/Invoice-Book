/* ______________________________________________________________________________________________________

 * This doc is for creation of the template/ uuser data binding before it is stored in the database     *
 
 tableItem 
   `````````
 * For each iteam is selected for the sale 
 
 invoiceItem 
 ``````````````
 which hold all the info about the invoice 

_________________________________________________________________________________________________________*/



class tableItem {
    constructor(id = 1, itemName = "", quantity = "", unit = "", pricePerUnit = "", amount = "") {
        this.id = id;
        this.itemName = itemName;
        this.quantity = quantity;
        this.unit = unit;
        this.pricePerUnit = pricePerUnit;
        this.amount = amount;
      }
  }


  class invoiceItem {
    constructor(id, name, gstNo, contactno, address, tableInfo, gstamt, tamt, time) {
      this.invoiceId = id;
      this.customer = name;
      this.gstno = gstNo;
      this.contactno = contactno;
      this.address = address;
      this.tableInfo = tableInfo;
      this.gstAmt = gstamt;
      this.totalAmt = tamt;
      this.creationTime = time
    }
  }
  
  export { tableItem, invoiceItem };
  
//   const newItem = new Item(2, "Apples", 10, "kg", 5.0, 50.0);
  
//   // Convert to JSON string before storing
//   const jsonString = JSON.stringify(newItem);
  