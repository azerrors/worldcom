import React from "react";
import Sidebar from "../ui/Sidebar";
import MainMap from "../features/MainMap";

function Map() {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <MainMap />
    </div>
  );
}

export default Map;
