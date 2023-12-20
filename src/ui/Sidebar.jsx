import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import { TfiWorld } from "react-icons/tfi";

import { useWorld } from "../context/WorldContext";

import { useUrlPosition } from "../hooks/useUrlPosition";

import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";

import locationApi from "../services/locationApi";
import getCurrentWeather from "../services/weatherApi";

import SideWeather from "../features/SideWeather";
import countryCodeToFlag from "../utilites/ChangeToFlag";

import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";
import Favorites from "../pages/Favorites";
import { toast } from "react-toastify";

function Sidebar() {
  const [show, setShow] = useState(false);

  //to get lat and lng values from url
  const [lat, lng] = useUrlPosition();

  //context api
  const { currtemp, showFav, dispatch, favorites } = useWorld();

  //fetch choosen place information
  const { data: placeInfo, isLoading: placeInfoLoading } = useQuery({
    queryKey: ["latandlng", lat, lng],
    queryFn: () => locationApi({ lat, lng }), // Pass an object with lat and lng properties
  });

  //fetch weather information
  const { data: weatherInfo, isLoading: weatherLoading } = useQuery({
    queryKey: ["weather", placeInfo && placeInfo.city, currtemp],
    queryFn: () => getCurrentWeather(placeInfo && placeInfo.city, currtemp),
  });

  //array destruction
  const { city, continent, countryName, locality, longitude, countryCode } =
    placeInfo ? placeInfo : {};

  const isAdd = favorites.some((fav) => fav.longitude === longitude);

  const addFav = () => {
    dispatch({ type: "fav/add", payload: placeInfo });
    toast.success("location added to favorites", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  const deleteFav = () => {
    dispatch({ type: "fav/delete", payload: longitude });
    toast.error("location deleted from favorites", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };
  //to convert the country code to the flag of the selected location
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

  //stlyes
  const h2Style =
    "md:text-xl text-lg border-b border-stone-800 pb-1  text-center uppercase font-medium tracking-widest";
  const h3Style = "md:text-md text-md text-center uppercase tracking-wider";

  if (!showFav) {
    return (
      <div className="bg-secondary_light text-primary_light  dark:bg-secondary_dark md:w-[50%]">
        <h1 className="hover:skew-x-3 hover:skew-y-2 hover:scale-[1.3] transition-all duration-300 mt-20 text-center text-3xl font-semibold uppercase tracking-widest">
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
                <div className="my-20 relative flex animate-moveInTop justify-center ">
                  <TfiWorld
                    className="animate-rotatev1 cursor-pointer text-[5rem]"
                    onClick={() => dispatch({ type: "showFav" })}
                  />
                  <span className="absolute font-semibold md:right-[14.5rem] right-[8rem]  text-xl top-16">{favorites.length}</span>
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
                <div className="mr-8 mt-20  flex animate-moveInBottom items-center justify-end gap-5 pb-10 md:mr-16">
                  {isAdd ? (
                    <BsHeartFill
                      onClick={deleteFav}
                      className="cursor-pointer text-3xl transition-all duration-200 hover:-translate-y-1 active:translate-y-1"
                    />
                  ) : (
                    <BsHeart
                      onClick={addFav}
                      className="cursor-pointer text-3xl transition-all duration-200 hover:-translate-y-1 active:translate-y-1"
                    />
                  )}

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
  if (showFav) {
    return <Favorites />;
  }
}

export default Sidebar;
