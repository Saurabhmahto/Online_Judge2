import React from "react";
import ReactDOM from "react-dom";
import AppLayout from "./src/AppLayout";
import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";
import Home from "./src/components/Home";
import SignUp from "./src/components/SignUp";
import Login from "./src/components/Login";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
                { path: "/", element: <Home/> },
                {path:"/signup",element:<SignUp/>},
                {path:"/login",element:<Login/>},
                
            ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
