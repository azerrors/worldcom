import React from "react";
import MainMap from "../features/MainMap";
import Sidebar from "../ui/Sidebar";

function Map() {
  return (
    <div className="flex  min-h-screen flex-col bg-secondary_light dark:bg-secondary_dark md:flex-row">
      <Sidebar />
      <MainMap />
    </div>
  );
}

export default Map;
