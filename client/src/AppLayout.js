import React, { useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userContext from "./services/userContext";

const AppLayout = () => {
  const [userName,setUserName] =useState('');
  return (
    <userContext.Provider value={{userName,setUserName}}>
      <Header/>
      <Outlet/>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </userContext.Provider>
  );
};

export default AppLayout;
