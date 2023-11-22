import React from "react";
import Sidebar from "../ui/Sidebar";
import MainMap from "../features/MainMap";

function Map() {
  return (
    <div className="flex bg-secondary_light min-h-screen dark:bg-secondary_dark flex-col md:flex-row">
      <Sidebar />
      <MainMap />
    </div>
  );
}

export default Map;
