import ReactDOM from 'react-dom/client';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  PDFViewer,
} from '@react-pdf/renderer';
import NotoSans from '@/assets/Fonts/NotoSans-CondensedBold.ttf'; // Adjust the path as necessary
import times from '@/assets/Fonts/times.ttf';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { TableItem, User } from '@/DataModels/DataModels';
import { useSelector } from 'react-redux';

// Register the font
Font.register({
  family: 'NotoSans',
  src: NotoSans,
});

Font.register({
  family: 'times',
  src: times,
});

// Define the styles
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    fontSize: 13,
    fontFamily: 'times', // Use the registered font
  },
  rupee: { fontSize: 12, fontFamily: 'NotoSans', fontWeight: 100 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  companyDetails: {
    lineHeight: 1,
    width: 250,
  },
  title: {
    fontSize: 24,
    textAlign: 'right',
  },

  horizontalLine: {
    width: '100%', // Full width of the page
    height: 1, // Thickness of the line
    backgroundColor: '#000', // Line color
    marginVertical: 5, // Space above and below the line
  },
  horizontalLine_total: {
    width: '100%', // Full width of the page
    height: 1, // Thickness of the line
    backgroundColor: '#000', // Line color
    marginVertical: 5, // Space above and below the line
  },
  billingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  billTo: {
    width: '50%',
    lineHeight: 1,
  },
  invoiceDetails: {
    fontSize: 12,
    margin: 5,
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '14.3%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 2,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    textAlign: 'center',
  },
  totalSection: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taxSummary: {
    margin: 10,
    fontSize: 12,
  },
  totalAmount: {
    margin: 5,
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
    textAlign: 'right',
    marginTop: 40,
    fontSize: 10,
  },
});

interface QuixoteProps {
  user: User;
  customer: string;
  address: string;
  contact: string;
  date: string;
  gstNo: string;
  gstamt: number;
  tamt: number;
  invoiceNo: string;
  data: Array<TableItem>;
  Subtotal: number;
  E_waybillno: string;
  vehicleno: string;
  subTotal: string;
  gsttype: boolean;
}
// Define the PDF document
const Quixote: React.FC<QuixoteProps> = ({
  user,
  customer,
  contact,
  E_waybillno,
  vehicleno,
  subTotal,
  address,
  date,
  gstNo,
  gstamt,
  tamt,
  invoiceNo,
  data,
  gsttype,
}) => (
  <Document>
    <Page style={styles.container}>
      <View style={styles.header}>
        <View style={styles.companyDetails}>
          <Text style={{ fontSize: 15 }}>{user.company}</Text>
          <Text style={{ fontSize: 12 }}>
            {user.address},{'\n'}
            GSTIN: {user.gstNo},{'\n'}
            State: {user.state}
          </Text>
        </View>
        <View>
          <Text style={styles.title}>Sales Invoice</Text>
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.billingInfo}>
        <View style={styles.billTo}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Bill to,</Text>
          <Text style={{ fontSize: 12 }}>{customer}</Text>
          <Text style={{ fontSize: 12 }}>{address}</Text>
          {contact && (
            <Text style={{ fontSize: 12 }}>Contact No.: {contact}</Text>
          )}
          <Text style={{ fontSize: 12 }}>GSTIN: {gstNo}</Text>
        </View>
        <View style={styles.invoiceDetails}>
          <Text>Invoice No: {invoiceNo}</Text>
          <Text>Date: {date}</Text>
          <Text>E-Way Bill no: {E_waybillno}</Text>
          <Text>Vehicle No: {vehicleno}</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>#</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Item</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>HSN Code</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Quantity</Text>
          </View>{' '}
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Unit</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Price</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Amount</Text>
          </View>
        </View>

        {data.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.id}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.item}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.hsnCode}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.unit}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.quantity}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.price}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.amount}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.totalSection}>
        <View style={styles.taxSummary}>
          {!gsttype ? (
            <Text>
              IGST @18%: <Text style={styles.rupee}> ₹ </Text> {gstamt}
            </Text>
          ) : (
            <>
              <Text>
                SGST @9%: <Text style={styles.rupee}> ₹ </Text> {gstamt / 2}
              </Text>
              <Text>
                CGST @9%: <Text style={styles.rupee}> ₹ </Text> {gstamt / 2}
              </Text>
            </>
          )}
        </View>
        <View style={styles.totalAmount}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text>
              Sub Total: <Text style={styles.rupee}>₹ </Text>
            </Text>

            <Text>{subTotal}</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text>
              Tax: <Text style={styles.rupee}>₹ </Text>
            </Text>

            <Text>{gstamt}</Text>
          </View>
          <View style={styles.horizontalLine_total} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text>
              Total: <Text style={styles.rupee}>₹ </Text>
            </Text>

            <Text>{tamt}</Text>
          </View>
        </View>
      </View>

      <View style={styles.termsAndConditions}>
        <Text style={{ textDecoration: 'underline' }}>
          Terms and Conditions:
        </Text>
        <Text>
          Goods once sold cannot be taken back or exchanged. {'\n'}
          Damage in transportation is Risk. {'\n'}
          Amount of bill not paid within 15 days, 2.5% interest will be charged{' '}
          {'\n'}
          per month. All disputes subject to Bangalore Jurisdiction.
        </Text>
      </View>

      <View style={styles.bankDetails}>
        <Text style={{ textDecoration: 'underline' }}>Bank Details:</Text>
        <Text>
          Name: {user.BankName} {'\n'}
          Account No.: {user.AccountNo} {'\n'}
          IFSC code: {user.IFSC_code} {'\n'}
          Account name: {user.AccountName} {'\n'}
        </Text>
      </View>

      <View style={styles.signature}>
        <Text>For: {user.company}</Text>
        <Text>Authorized Signatory</Text>
      </View>
    </Page>
  </Document>
);

// Component to view PDF
const ViewInvoice = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const invoicedata = location.state?.ValidatedData || {};
  const user = useSelector((state: { user: User }) => state.user);
  console.log(invoicedata);
  console.log('this is the user ', user);

  const handlegoback = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (invoicedata !== null) {
      navigate('/invoice', { state: { invoicedata } });
    }
  };

  return (
    <div className="flex items-start flex-row">
      {/* Go Back Button */}
      <button
        onClick={(e) => {
          handlegoback(e);
        }} // Navigate back to the previous page
        style={{
          position: 'relative',
          top: '10px',
          left: '10px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Go Back
      </button>

      <PDFViewer
        className="createcart"
        style={{
          width: 'calc(78vw)',
          left: 'calc(2vw)',
          position: 'relative',
          top: '10px',
          height: '90vh',
          border: 'none',
        }}
      >
        <Quixote
          user={user}
          customer={invoicedata.company}
          contact={invoicedata.contact}
          E_waybillno={invoicedata.E_waybillno}
          vehicleno={invoicedata.vehicleno}
          Subtotal={invoicedata.subtotalamt}
          address={invoicedata.cadress}
          date={invoicedata.Idate}
          gstNo={invoicedata.gstid}
          gstamt={invoicedata.taxAmount}
          invoiceNo={invoicedata.Iid}
          data={invoicedata.tableData}
          tamt={invoicedata.totalAmount}
          subTotal={invoicedata.subtotalamt}
          gsttype={invoicedata.gsttype}
        />
      </PDFViewer>
    </div>
  );
};

const rootElement = document.getElementById('main');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<ViewInvoice />);
}

export default ViewInvoice;
