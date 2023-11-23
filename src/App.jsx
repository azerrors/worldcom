import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "leaflet/dist/leaflet.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WorldProvider } from "./context/WorldContext";
import About from "./pages/About";
import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Weather from "./pages/Weather";
import Applayout from "./ui/Applayout";
import Sidebar from "./ui/Sidebar";

function App() {
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
              {/* <Route path="weather:info" id="#weather" element={<Weather />} /> */}
              <Route path="favorite" id="#favorite" element={<Favorite />} />
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
