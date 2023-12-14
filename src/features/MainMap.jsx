import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useUrlPosition } from "../hooks/useUrlPosition";
import { useGeolocation } from "../hooks/useGeolocation";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { Icon } from "leaflet";
import Button from "../ui/Button";
import { useWorld } from "../context/WorldContext";

function MainMap() {
  const [mapPosition, setMapPosition] = useState([45, 40]);

  //context api
  const { weatherLng, weatherLat, favorites } = useWorld();

  //to get user location
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  //TO GET LAT AND LNG VALUES FROM URL
  const [mapLat, mapLng] = useUrlPosition();

  //notification and get location
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
    //---
    getPosition();
  };

  //if user position values are available, they will be passed to the mapPosition state to be displayed on the map
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng],
  );

  //if user position values are available, they will be passed to the mapPosition state to be displayed on the map
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition],
  );

  //icon to show on the map
  const customIcon = new Icon({
    iconUrl: "placeholder.png",
    iconSize: [30, 30],
  });

  const customIcon2 = new Icon({
    iconUrl: "showmap.png",
    iconSize: [30, 30],
  })

  return (
    <div className="relative mx-5 md:mx-1  md:w-full">
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
        {geolocationPosition && (
          <Marker
            icon={customIcon}
            position={[geolocationPosition.lat, geolocationPosition.lng]}
          >
            <Popup></Popup>
          </Marker>
        )}
        {/* {weatherLat && weatherLng && (
          <Marker icon={customIcon2} position={[weatherLat, weatherLng]}>
            <Popup></Popup>
          </Marker>
        )} */}
        {favorites &&
          favorites?.map((fav) => {
            return (
              <Marker
                key={fav.latitude}
                icon={customIcon}
                position={[fav.latitude, fav.longitude]}
              >
                <Popup></Popup>
              </Marker>
            );
          })}

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
