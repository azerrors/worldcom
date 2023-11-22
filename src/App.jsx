import React from "react";
import "leaflet/dist/leaflet.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Applayout from "./ui/Applayout";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Favorite from "./pages/Favorite";
import About from "./pages/About";
import Map from "./pages/Map";
import Sidebar from "./ui/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { WorldProvider } from "./context/WorldContext";

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
