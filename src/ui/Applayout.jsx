import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Applayout() {
  return (
    <div className="bg-stone-200 h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Applayout;
