import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarLayout from './components/SidebarLayout';
import DashBoard from './pages/DashBoard';
import InvoiceGenerator from './pages/InvoiceGenerator';
import ViewInvoice from './pages/ViewInvoice';
import ListInvoices from './pages/Listing/ListInvoices';
import ListItems from './pages/Listing/ListItems';
import Listcustomers from './pages/Listing/Listcustomers';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/clerk-react';

function App() {
  return (
    // <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
    //   <SignedIn>
    <Router>
      <SidebarLayout>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/invoice" element={<InvoiceGenerator />} />
          <Route path="/invoice/viewInvoice" element={<ViewInvoice />} />
          <Route path="/listInvoices" element={<ListInvoices />} />
          <Route path="/listItems" element={<ListItems />} />
          <Route path="/listcustomers" element={<Listcustomers />} />
        </Routes>
      </SidebarLayout>
    </Router>
    //   </SignedIn>
    //   <SignedOut>
    //     <RedirectToSignIn />
    //   </SignedOut>
    // </ClerkProvider>
  );
}

export default App;
