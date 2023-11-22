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

function MainMap() {
  const { favorites } = useWorld();
  const [mapPosition, setMapPosition] = useState([45, 40]);
  // console.log(mapPosition)
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className="md:w-full mx-1 relative">
      {!geolocationPosition && (
        <div
          onClick={getPosition}
          className=" border bg-slate-400 absolute bottom-28 left-[50%] translate-x-[-50%] z-[1000] "
        >
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </div>
      )}

      <MapContainer
        className="h-screen"
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {favorites?.map((city) => (
          <Marker position={[city.lat, city.lng]} key={city.id}>
            <Popup>
              {/* <span>{city.emoji}</span> <span>{city.cityName}</span> */}
            </Popup>
          </Marker>
        ))}

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
