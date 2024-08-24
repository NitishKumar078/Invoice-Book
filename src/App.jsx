import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from './home.jsx';
import SidePanal from './Components/sidePanal/sidePanal.jsx';
import Invoice from './Components/generateInvoice/Invoice.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><SidePanal/><Home/></>,
    },{
      path: "/create",
      element: <><SidePanal/><Invoice/></>,
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
