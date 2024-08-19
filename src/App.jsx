import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Home from "./home.jsx";
import SideBar from './Components/sideBar.jsx';
import Invoice from "./Components/Invoice.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><SideBar/><Home/></>,
    },{
      path: "/create",
      element: <><SideBar/><Invoice/></>,
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
