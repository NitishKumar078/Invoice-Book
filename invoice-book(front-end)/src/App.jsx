import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from './home.jsx';
import SidePanal from './Components/sidePanal/sidePanal.jsx';
import Invoice from './Pages/generateInvoice/Invoice.jsx';
import PDFViewerComponent from './Components/pdfGeneratore/pdfGeneratore';
import Setting from './Pages/settings/Settings';
import Invoices from "./Pages/invoice's/invoices";




function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><SidePanal/><Home/></>,
    },{
      path: "/setting",
      element: <><SidePanal/><Setting/></>,
    },{
      path: "/create",
      element: <><SidePanal/><Invoice/></>,
    },{
      path: "/viewInvoice",
      element: <><SidePanal/><PDFViewerComponent /></>,
    },{
      path: "/invoices",
      element: <>     <SidePanal/> <Invoices /></>,
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
