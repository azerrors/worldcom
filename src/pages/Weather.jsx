import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { GiSunset, GiWindTurbine } from "react-icons/gi";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { RiWindyLine } from "react-icons/ri";
import { MdOutlineVisibility } from "react-icons/md";
import { WiHumidity, WiSunrise } from "react-icons/wi";
import { LuWaves } from "react-icons/lu";

import getCurrentWeather, { getForecastWeather } from "../services/weatherApi";

import { useWorld } from "../context/WorldContext";
import Button from "../ui/Button";
import Message from "../ui/Message";
import Search from "../ui/Search";
import Spinner from "../ui/Spinner";

function Weather() {
  const navigate = useNavigate();

  //to display on the map
  const displayOnMap = () => {
    navigate(`/map?lat=${location.lat}&lng=${location.lon}`);
  };

  //to get location name from url
  const [searchParam] = useSearchParams();
  const currentName = searchParam.get("name");

  //if the user comes from the weather button in the sidebar, the input values will be the city shown in the sidebar
  const [input, setInput] = useState(currentName ? currentName : "");

  //context api
  const { temp, currtemp } = useWorld();


  //fetch current weather information
  const { data: currentWeather, isLoading: currentLoading } = useQuery({
    queryKey: ["weather/current", input, currtemp],
    queryFn: () => getCurrentWeather(input, currtemp),
  });
  //array desturiction
  const { weather, main, wind, visibility } = currentWeather
    ? currentWeather
    : {};

  //fetch forecast weather information
  const { data: forecastDaysWeather, isLoading: forecastDaysWeatherLoading } =
    useQuery({
      queryKey: ["weather/forecast", input],
      queryFn: () => getForecastWeather(input),
    });
  //array destruction
  const { forecast, location } = forecastDaysWeather ? forecastDaysWeather : [];

  //to reach hour info
  const hour = forecast?.forecastday.map((forecastDay) =>
    forecastDay.hour?.map((hour) => hour),
  );

  return (
    <div className="min-h-screen bg-secondary_light dark:bg-secondary_dark">
      <Message type="secondary">Find your city`s weather</Message>

      <Search setInput={setInput} input={input} />
      {currentLoading && (
        <div className="flex justify-center pt-40 text-2xl">
          <Spinner />
        </div>
      )}
      {currentWeather?.cod !== "400" && currentWeather?.cod !== "404" ? (
        <div className="flex flex-col   gap-2 p-2">
          <div className=" mt-10 flex flex-col  gap-4 text-primary_light md:flex-row ">
            <div>
              <>
                <div className=" min-h-72 animate-moveInLeft  rounded-xl  bg-triatary_light p-3 dark:bg-triatary_dark md:w-96 ">
                  <div className="flex h-3/5 items-center justify-around border-b">
                    <div>
                      <p className=" text-sm font-semibold uppercase  md:text-lg">
                        Now
                      </p>
                      <h1 className="text-[2rem] font-bold md:text-[4rem]">
                        {main?.temp.toFixed()}°
                      </h1>
                      <p className="font-medium uppercase tracking-wider">
                        {weather?.map((temp) => temp.description)}
                      </p>
                    </div>
                    {currentWeather?.weather?.map((temp) => temp.icon) ? (
                      <img
                        src={`https:${forecastDaysWeather?.current?.condition?.icon}`}
                        alt=""
                        className="md:h-40 md:w-40 "
                      />
                    ) : (
                      <div className="">{/* <Spinner /> */}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 pt-5 font-medium uppercase tracking-wider ">
                    <div className="flex flex-col gap-3">
                      <h1>{forecastDaysWeather?.location?.localtime}</h1>
                      <h1 className="flex text-sm">
                        <span>{forecastDaysWeather?.location?.name}/</span>
                        {forecastDaysWeather?.location?.country}
                      </h1>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <div className="flex items-center">
                        <FaArrowDown />
                        <h3>{main?.temp_min.toFixed()}°</h3>
                      </div>
                      <div className="flex items-center">
                        <FaArrowUp />
                        <h3>{main?.temp_max.toFixed()}°</h3>
                      </div>
                      <div className="flex items-center">
                        <GiWindTurbine />
                        <h3>{wind?.speed}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex animate-moveInLeft justify-end pt-5">
                  <Button type="weather" onClick={displayOnMap}>
                    Show on the map
                  </Button>
                </div>
              </>
            </div>

            <div className="animate-moveInBottom rounded-xl   bg-triatary_light p-4 dark:bg-triatary_dark md:w-screen">
              <h1 className="mb-3 font-semibold text-primary_light/70">
                Todays Highlights
              </h1>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="md:w-1/2">
                  <div>
                    <div className="rounded-xl bg-secondary_light p-5  dark:bg-secondary_dark">
                      <div className="flex flex-col items-center justify-between md:flex-row">
                        <h1 className="mb-3 font-semibold text-primary_light/70">
                          Air Quality
                        </h1>
                        <span className="rounded-full border border-green-200 p-1 ">
                          Good
                        </span>
                      </div>
                      <div className="mt-2 flex flex-col items-center justify-around md:flex-row">
                        <RiWindyLine className="text-[2.5rem] md:text-[5rem]" />
                        <div className="flex gap-5 text-center">
                          <div>
                            <h3 className="text-sm text-primary_light/70">
                              PM 2.5
                            </h3>
                            <p className="text-3xl md:text-[2.5rem]">
                              {forecastDaysWeather?.current?.air_quality?.pm2_5}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm text-primary_light/70">
                              CO
                            </h3>
                            <p className="text-3xl md:text-[2.5rem]">
                              {forecastDaysWeather?.current?.air_quality?.co}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm text-primary_light/70">
                              NO2
                            </h3>
                            <p className="text-3xl  md:text-[2.5rem]">
                              {forecastDaysWeather?.current?.air_quality?.no2}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm text-primary_light/70">
                              SO2
                            </h3>
                            <p className="text-3xl  md:text-[2.5rem]">
                              {forecastDaysWeather?.current?.air_quality?.so2}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-center gap-5 ">
                      <div className=" w-1/2 rounded-xl bg-secondary_light p-5  dark:bg-secondary_dark">
                        <h1 className="mb-3 font-semibold text-primary_light/70">
                          Humidity
                        </h1>
                        <div className="flex items-center justify-between gap-5">
                          <WiHumidity className="text-[3rem]" />
                          <h1 className="text-xl font-semibold md:text-2xl">
                            {currentWeather?.main?.humidity}%
                          </h1>
                        </div>
                      </div>
                      <div className=" w-1/2 rounded-xl bg-secondary_light p-5  dark:bg-secondary_dark">
                        <h1 className="mb-3 font-semibold text-primary_light/70">
                          Pressure
                        </h1>
                        <div className="flex items-center justify-between gap-5">
                          <LuWaves className="text-[3rem]" />
                          <h1 className="font-semibold md:text-2xl">
                            {currentWeather?.main?.pressure}hPa
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div>
                    <div className="rounded-xl bg-secondary_light p-5  dark:bg-secondary_dark">
                      <h1 className="mb-5 font-semibold text-primary_light/70">
                        Sunrise & Sunset
                      </h1>
                      <div className="flex  items-center justify-around">
                        <div className="flex flex-col items-center gap-4 md:flex-row">
                          <WiSunrise className="text-[4rem]" />
                          <div>
                            <h3 className="font-semibold  text-primary_light/70">
                              Sunrise
                            </h3>
                            <h3 className="font-semibold md:text-[2rem]">
                              {forecast?.forecastday
                                ?.slice(0, 1)
                                ?.map((days) => {
                                  return (
                                    <h3 key={days}>{days?.astro?.sunrise}</h3>
                                  );
                                })}
                            </h3>
                          </div>
                        </div>
                        <div className="flex flex-col items-center  gap-4 md:flex-row">
                          <GiSunset className="text-[4rem]" />
                          <div>
                            <h3 className="font-semibold  text-primary_light/70">
                              Sunset
                            </h3>
                            <h3 className="font-semibold md:text-[2.4rem]">
                              {forecast?.forecastday
                                ?.slice(0, 1)
                                ?.map((days) => {
                                  return (
                                    <h3 key={days}>{days?.astro?.sunset}</h3>
                                  );
                                })}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-center gap-5 ">
                      <div className=" w-1/2 rounded-xl bg-secondary_light p-5  dark:bg-secondary_dark">
                        <h1 className="mb-3 font-semibold text-primary_light/70">
                          Visibility
                        </h1>
                        <div className="flex items-center justify-between gap-5">
                          <MdOutlineVisibility className="text-[3rem]" />
                          <h1 className="font-semibold md:text-2xl">
                            {visibility}
                          </h1>
                        </div>
                      </div>
                      <div className=" w-1/2 rounded-xl bg-secondary_light p-5  dark:bg-secondary_dark">
                        <h1 className="mb-3 font-semibold text-primary_light/70">
                          Feels Like
                        </h1>
                        <div className="flex items-center justify-between gap-5">
                          <LiaTemperatureHighSolid className="text-[3rem]" />
                          <h1 className="text-xl font-semibold md:text-2xl">
                            {currentWeather?.main?.feels_like.toFixed()}°
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex  flex-col gap-4 md:flex-row">
            <div className="max-h-[33rem] animate-moveInBottom  rounded-xl bg-triatary_light p-3 text-primary_light dark:bg-triatary_dark md:w-96">
              <h3 className="mb-2 text-lg font-semibold uppercase  text-primary_light/70">
                7 days forecast
              </h3>
              {!forecastDaysWeatherLoading ? (
                <div className="flex flex-wrap items-center justify-center">
                  {forecast?.forecastday?.map((days) => {
                    return (
                      <div
                        key={days.date}
                        className="flex items-center justify-around gap-20"
                      >
                        <img
                          src={`https:${days?.day?.condition?.icon}`}
                          alt=""
                        />
                        <h2 className="text-lg font-semibold">
                          {temp
                            ? days?.day?.avgtemp_f.toFixed()
                            : days?.day?.avgtemp_c.toFixed()}
                          °
                        </h2>
                        <h3 className="font-semibold">{days.date}</h3>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex h-56 items-center justify-center text-2xl">
                  <Spinner />
                </div>
              )}
            </div>
            <div className="animate-moveInBottom rounded-xl bg-triatary_light p-3 text-primary_light  dark:bg-triatary_dark md:w-3/4">
              <h3 className="mb-5 text-lg font-semibold uppercase  text-primary_light/70">
                Hourly forecast
              </h3>
              {!forecastDaysWeatherLoading ? (
                <div>
                  <div className="flex flex-wrap items-center justify-around gap-5">
                    {hour?.map((hour) =>
                      hour.map((curhour) => {
                        return (
                          <div key={curhour.time} x>
                            <div className="flex flex-col justify-center text-center ">
                              <p className="text-lg font-semibold">
                                {curhour.time}
                              </p>
                              <img
                                src={`https:${curhour?.condition?.icon}`}
                                alt=""
                              />
                              <h3 className="text-lg font-semibold">
                                {temp
                                  ? curhour.temp_f.toFixed()
                                  : curhour.temp_c.toFixed()}
                                °
                              </h3>
                            </div>
                          </div>
                        );
                      }),
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex h-56 items-center justify-center text-2xl">
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Message type="primary">
          {currentWeather?.cod !== "404" ? "" : "Please try correct location"}
        </Message>
      )}
    </div>
  );
}

export default Weather;
