import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Home from "./home.jsx";
import SideBar from './Components/sideBar.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><SideBar/><Home/></>,
    },{
      path: "/Invoices",
      element: <><SideBar/><div>Invoices</div></>,
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
