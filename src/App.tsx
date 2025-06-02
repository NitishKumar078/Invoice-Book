import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarLayout from './components/SidebarLayout';
import DashBoard from './pages/DashBoard';
const ViewInvoice = React.lazy(() => import('./pages/ViewInvoice'));
import InvoiceGenerator from './pages/InvoiceGenerator';
const ListInvoices = React.lazy(() => import('./pages/Listing/ListInvoices'));
const ListItems = React.lazy(() => import('./pages/Listing/ListItems'));
const Listcustomers = React.lazy(() => import('./pages/Listing/Listcustomers'));
import React, { Suspense } from 'react';
import ListLoader from './components/ui/ListLoader';

function App() {
  return (
    <Router>
      <SidebarLayout>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route
            path="/invoice/viewInvoice"
            element={
              <Suspense fallback={<ListLoader />}>
                <ViewInvoice />
              </Suspense>
            }
          />
          <Route path="/invoice/viewInvoice" element={<InvoiceGenerator />} />
          <Route
            path="/invoice"
            element={
              <Suspense fallback={<ListLoader />}>
                <ListInvoices />
              </Suspense>
            }
          />
          <Route
            path="/listItems"
            element={
              <Suspense fallback={<ListLoader />}>
                <ListItems />
              </Suspense>
            }
          />
          <Route
            path="/listcustomers"
            element={
              <Suspense fallback={<ListLoader />}>
                <Listcustomers />
              </Suspense>
            }
          />
        </Routes>
      </SidebarLayout>
    </Router>
  );
}

export default App;
