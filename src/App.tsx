import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import SidePanal from "./Components/sidePanal/sidePanal";
import Invoice from "./Pages/generateInvoice/Invoice";
import Items from "./Pages/Itemlist/items";
import AddCustomer from "./Components/AddCustomers/AddCustomer";
import Customers from "./Pages/customers/customers";
import AddItem from "./Components/AddItems/AddItem";
import PDFViewerComponent from "./Components/pdfGeneratore/pdfGeneratore";
import Setting from "./Pages/settings/Settings";
import Invoices from "./Pages/invoice's/invoices";
import "./index.css"; // Adjust the path if necessary

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
          <SidePanal />
          <Invoices />
        </>
      ),
    },
    {
      path: "/Items",
      element: (
        <>
          <SidePanal />
          <Items />
        </>
      ),
    },
    {
      path: "/Items/newItem",
      element: (
        <>
          {" "}
          <SidePanal /> <AddItem />{" "}
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
          {" "}
          <SidePanal /> <AddCustomer />{" "}
        </>
      ),
    },
  ]);

  return (
    <div className="flex flex-row " >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
