import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { WorldProvider } from "./context/WorldContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Weather from "./pages/Weather";
import Applayout from "./ui/Applayout";
import Sidebar from "./ui/Sidebar";

import "leaflet/dist/leaflet.css";

function App() {
  //for react query
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <WorldProvider>
        <ReactQueryDevtools />
        <BrowserRouter>
          <Routes>
            <Route element={<Applayout />}>
              <Route path="/" index element={<Home />} />
              <Route path="weather" id="#weather" element={<Weather />} />
              <Route path="about" id="#about" element={<About />} />
              <Route path="map" id="#map" element={<Map />} />
              <Route path="sidebar" id="#sidebar" element={<Sidebar />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </WorldProvider>
    </QueryClientProvider>
  );
}

export default App;
