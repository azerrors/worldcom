import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { TfiWorld } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { useWorld } from "../context/WorldContext";
import SideWeather from "../features/SideWeather";
import { useUrlPosition } from "../hooks/useUrlPosition";
import locationApi from "../services/locationApi";
import getCurrentWeather from "../services/weatherApi";
import countryCodeToFlag from "../utilites/ChangeToFlag";
import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";

function Sidebar() {
  const [lat, lng] = useUrlPosition();
  const navigate = useNavigate();
  const { dispatch, favorites, temp } = useWorld();
  const [show, setShow] = useState(false);

  const currtemp = `${temp ? "imperial" : "metric"}`;

  const { data: placeInfo, isLoading: placeInfoLoading } = useQuery({
    queryKey: ["latandlng", lat, lng],
    queryFn: () => locationApi({ lat, lng }), // Pass an object with lat and lng properties
  });

  const { data: weatherInfo, isLoading: weatherLoading } = useQuery({
    queryKey: ["weather", placeInfo && placeInfo.city, currtemp],
    queryFn: () => getCurrentWeather(placeInfo && placeInfo.city, currtemp),
  });

  const { city, continent, countryName, locality, countryCode } = placeInfo
    ? placeInfo
    : {};

  const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        className="scale-[0.7]"
        alt="flag"
      />
    );
  };

  const h2Style =
    "md:text-xl text-lg border-b border-stone-800 pb-1  text-center uppercase font-medium tracking-widest";
  const h3Style = "md:text-md text-md text-center uppercase tracking-wider";
  return (
    <div className="bg-secondary_light text-primary_light  dark:bg-secondary_dark md:w-[50%]">
      <h1 className="mt-20 text-center text-3xl font-semibold uppercase tracking-widest">
        Worldcom
      </h1>
      {placeInfoLoading && (
        <div className="md: mt-56 flex h-screen justify-center text-2xl md:mt-80">
          <Spinner />
        </div>
      )}
      {countryName && city ? (
        <>
          {!show ? (
            <>
              <div className="my-20 flex animate-moveInTop justify-center text-[5rem]">
                <TfiWorld />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-20">
                <div className="animate-moveInTop">
                  <h2 className={h2Style}>City</h2>
                  <h3 className={h3Style}>{city}</h3>
                </div>
                <div className="animate-moveInTop">
                  <h2 className={h2Style}>Continent</h2>
                  <h2 className={h3Style}>{continent}</h2>
                </div>
                <div className="animate-moveInTop">
                  <h2 className={h2Style}>Country</h2>
                  <h2 className={`${h3Style} flex justify-center gap-1`}>
                    {countryName}
                    {flagemojiToPNG(countryCodeToFlag(countryCode))}
                  </h2>
                </div>
                <div className="animate-moveInTop">
                  <h2 className={h2Style}>Locality</h2>
                  <h2 className={h3Style}>{locality}</h2>
                </div>
              </div>
              <div className="mr-8 mt-20 flex animate-moveInBottom justify-end gap-5 pb-10 md:mr-16">
                {weatherInfo && (
                  <Button
                    type="weather"
                    onClick={() => setShow((show) => !show)}
                  >
                    weather
                  </Button>
                )}
              </div>
            </>
          ) : !weatherLoading ? (
            <SideWeather
              info={weatherInfo}
              setShow={setShow}
              lng={lng}
              lat={lat}
            />
          ) : (
            <div className="mt-80 flex h-screen justify-center text-2xl">
              <Spinner />
            </div>
          )}
        </>
      ) : (
        !placeInfoLoading && (
          <Message type="primary">Try other location</Message>
        )
      )}
    </div>
  );
}

export default Sidebar;
