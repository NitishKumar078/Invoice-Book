import React from "react";
import ReactDOM from "react-dom/client";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";
import NotoSans from "__root/assets/Fonts/NotoSans-CondensedBold.ttf"; // Adjust the path as necessary

// Register the font
Font.register({
  family: "NotoSans",
  src: NotoSans,
});

// Define the styles
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    fontSize: 13,
    fontFamily: "NotoSans", // Use the registered font
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  companyDetails: {
    lineHeight: 1.2,
    width: 250,
  },
  title: {
    fontSize: 24,
    textAlign: "right",
  },
  horizontalLine: {
    width: "100%", // Full width of the page
    height: 1, // Thickness of the line
    backgroundColor: "#000", // Line color
    marginVertical: 5, // Space above and below the line
  },
  billingInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  billTo: {
    width: "50%",
    lineHeight: 1.2,
  },
  invoiceDetails: {
    margin: 5,
    textAlign: "right",
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 20,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 8,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    textAlign: "center",
  },
  totalSection: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taxSummary: {
    margin: 10,
    fontSize: 12,
  },
  totalAmount: {
    margin: 5,
    textAlign: "right",
    fontSize: 12,
  },
  termsAndConditions: {
    margin: 5,
    lineHeight: 1.2,
    width: 300,
    fontSize: 10,
  },
  bankDetails: {
    marginTop: 5,
    width: 250,
    margin: 5,
    lineHeight: 1.2,
    fontSize: 10,
  },
  signature: {
    margin: 5,
    textAlign: "right",
    marginTop: 40,
    fontSize: 10,
  },
});

// Define the PDF document
const Quixote = () => (
  <Document>
    <Page style={styles.container}>
      <View style={styles.header}>
        <View style={styles.companyDetails}>
          <Text>JSR TRADERS</Text>
          <Text>
            172, Panthrapalya, Nayandahalli, Mysore road, Bangalore- 560039
            {"\n"}
            Phone no.: 9379060796
            {"\n"}
            Email: jsr_traders@yahoo.con
            {"\n"}
            GSTIN: 29AKNPR1200J1Z1,
            {"\n"}
            State: 29-Karnataka
          </Text>
        </View>
        <View>
          <Text style={styles.title}>Sales Invoice</Text>
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.billingInfo}>
        <View style={styles.billTo}>
          <Text>Bill To</Text>
          <Text>Customer name</Text>
          <Text>Address</Text>
          <Text>Contact No.: [Number]</Text>
          <Text>GSTIN: 328dsf1734284</Text>
        </View>
        <View style={styles.invoiceDetails}>
          <Text>Invoice No: [Number]</Text>
          <Text>Date: [Date]</Text>
        </View>
      </View>

      <Text>Dummy Table Example</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>#</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Item</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Description</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Quantity</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Price</Text>
          </View>
        </View>

        {[1, 2, 3, 4, 5].map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Item {item}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Description {item}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>$10.00</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.totalSection}>
        <View style={styles.taxSummary}>
          <Text>SGST @9%: ₹ 283.50</Text>
          <Text>CGST @9%: ₹ 283.50</Text>
        </View>
        <View style={styles.totalAmount}>
          <Text>Sub Total: ₹ 3,150.00</Text>
          <Text>Tax (18%): ₹ 567.00</Text>
          <Text style={styles.totalAmount}>Total: [Total Amount]</Text>
        </View>
      </View>

      <View style={styles.termsAndConditions}>
        <Text>Terms and Conditions:</Text>
        <Text>
          Goods once sold cannot be taken back or exchanged. {"\n"}
          Damage in transportation is Risk. {"\n"}
          Amount of bill not paid within 15 days, 2.5% interest will be charged{" "}
          {"\n"}
          per month. All disputes subject to Bangalore Jurisdiction.
        </Text>
      </View>

      <View style={styles.bankDetails}>
        <Text>Bank Details:</Text>
        <Text>
          Name: Punjab National Bank, Bangalore, Bhel, Mysore Road {"\n"}
          Account No.: 4247002100500917 {"\n"}
          IFSC code: PUNB0424700 {"\n"}
          Account name: JSR TRADERS
        </Text>
      </View>

      <View style={styles.signature}>
        <Text>For: JSR TRADERS</Text>
        <Text>Authorized Signatory</Text>
      </View>
    </Page>
  </Document>
);

// Component to view PDF
const PdfGeneratore = () => (
  <PDFViewer
    style={{
      width: "77vw",
      left: "21.5vw",
      position: "absolute",
      height: "97vh",
      border: "none",
    }}
  >
    <Quixote />
  </PDFViewer>
);

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<PdfGeneratore />);
}

export default PdfGeneratore;
