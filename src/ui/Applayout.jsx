import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SideNavbar from "./SideNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Futter from "./Futter";

function Applayout() {
  return (
    <div className="bg-stone-200 h-screen">
      <SideNavbar />
      <div>
        <Navbar />
        <Outlet />
        <Futter />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Applayout;
