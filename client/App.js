import React from "react";
import ReactDOM from "react-dom";
import AppLayout from "./src/AppLayout";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./src/components/Home";
import SignUp from "./src/components/SignUp";
import Login from "./src/components/Login";
import Task from "./src/components/Task";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      {path:"/add-problem",element:<Task/>},
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
