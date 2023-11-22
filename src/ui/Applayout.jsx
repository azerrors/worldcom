import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SideNavbar from "./SideNavbar";

function Applayout() {
  return (
    <div className="bg-stone-200 h-screen">
      <SideNavbar />
      <div>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default Applayout;
