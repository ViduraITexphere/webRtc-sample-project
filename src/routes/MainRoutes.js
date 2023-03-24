import { createBrowserRouter, Navigate } from "react-router-dom";

// import routing components
import Login from "../pages/loginPage/Login";
import Room from "../pages/room/Room";


const MainRoutes = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <RoomAccess />,
  // },
  //   {
  //   path: "/newroom",
  //   element: <NewRoom />
  //   },
    {
        path: "/",
        element: <Login/>
    },
    {
       path : "room",
        element: <Room/>
    }
]);

export default MainRoutes;
