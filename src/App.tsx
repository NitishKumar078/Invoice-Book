import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarLayout from './components/SidebarLayout';
import DashBoard from './pages/DashBoard';
import InvoiceGenerator from './pages/InvoiceGenerator';
import ViewInvoice from './pages/ViewInvoice';
import ListInvoices from './pages/Listing/ListInvoices';
import ListItems from './pages/Listing/ListItems';
import Listcustomers from './pages/Listing/Listcustomers';
import Payment from './pages/Payment';

function App() {
  return (
    <Router>
      <SidebarLayout>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/invoice" element={<InvoiceGenerator />} />
          <Route path="/invoice/viewInvoice" element={<ViewInvoice />} />
          <Route path="/listInvoices" element={<ListInvoices />} />
          <Route path="/listItems" element={<ListItems />} />
          <Route path="/listcustomers" element={<Listcustomers />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </SidebarLayout>
    </Router>
  );
}

export default App;
