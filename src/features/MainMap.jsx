import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useWorld } from "../context/WorldContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "../ui/Button";
import { toast } from "react-toastify";

function MainMap() {
  const [mapPosition, setMapPosition] = useState([49, 50]);
  // console.log(mapPosition)
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();

  console.log(geolocationPosition)
  console.log(mapPosition)
  const handlePosition = () => {
    toast.info("Location detected", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
    getPosition();
  };

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng],
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition],
  );

  return (
    <div className="relative mx-5  md:w-full">
      {!geolocationPosition && (
        <Button onClick={handlePosition} type="position">
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}

      <MapContainer
        className="h-screen"
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default MainMap;
