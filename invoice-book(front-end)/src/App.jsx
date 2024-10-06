import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home.jsx";
import SidePanal from "./Components/sidePanal/sidePanal.jsx";
import Invoice from "./Pages/generateInvoice/Invoice.jsx";
import Items from "./Pages/Itemlist/items.jsx";
import AddCustomer from "./Components/AddCustomers/AddCustomer";
import Customers from "./Pages/customers/customers.jsx";
import AddItem from "./Components/AddItems/AddItem.jsx";
import PDFViewerComponent from "./Components/pdfGeneratore/pdfGeneratore";
import Setting from "./Pages/settings/Settings";
import Invoices from "./Pages/invoice's/invoices";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <SidePanal />
          <Home />
        </>
      ),
    },
    {
      path: "/setting",
      element: (
        <>
          <SidePanal />
          <Setting />
        </>
      ),
    },
    {
      path: "/create",
      element: (
        <>
          <SidePanal />
          <Invoice />
        </>
      ),
    },
    {
      path: "/viewInvoice",
      element: (
        <>
          <SidePanal />
          <PDFViewerComponent />
        </>
      ),
    },
    {
      path: "/invoices",
      element: (
        <>
          <SidePanal /> <Invoices />
        </>
      ),
    },
    {
      path: "/Items",
      element: (
        <>
          <SidePanal /> <Items />
        </>
      ),
    },
    {
      path: "/Items/newItem",
      element: (
        <>
          <SidePanal /> <AddItem />
        </>
      ),
    },
    {
      path: "/Customers",
      element: (
        <>
          <SidePanal /> <Customers />
        </>
      ),
    },
    {
      path: "/Customers/newCustomer",
      element: (
        <>
          <SidePanal /> <AddCustomer />
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
