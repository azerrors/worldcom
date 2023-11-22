import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { GiSunset, GiWindTurbine } from "react-icons/gi";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { LuWaves } from "react-icons/lu";
import { MdOutlineVisibility } from "react-icons/md";
import { RiWindyLine } from "react-icons/ri";
import { WiHumidity, WiSunrise } from "react-icons/wi";
import { useNavigate, useSearchParams } from "react-router-dom";
import getCurrentWeather, { getForecastWeather } from "../services/weatherApi";
import Button from "../ui/Button";
import Message from "../ui/Message";
import Search from "../ui/Search";
import Spinner from "../ui/Spinner";
import { useWorld } from "../context/WorldContext";

function Weather() {
  const { temp } = useWorld();
  const currtemp = `${temp ? "imperial" : "metric"}`;


  const [searchParam] = useSearchParams();
  const currentName = searchParam.get("name");
  const [input, setInput] = useState(currentName ? currentName : "");
  const navigate = useNavigate();

  const { data: currentWeather, isLoading: currentLoading } = useQuery({
    queryKey: ["weather/current", input , currtemp],
    queryFn: () => getCurrentWeather(input, currtemp),
  });

  const { data: forecastDaysWeather, isLoading: forecastDaysWeatherLoading } =
    useQuery({
      queryKey: ["weather/forecast", input],
      queryFn: () => getForecastWeather(input),
    });
  const { forecast, location } = forecastDaysWeather ? forecastDaysWeather : [];
  const hour = forecast?.forecastday.map((forecastDay) =>
    forecastDay.hour?.map((hour) => hour)
  );
  // console.log(hour?.map((hour) => hour.map((curhour) => curhour.temp_c)));
  const { weather, main, wind, visibility } = currentWeather
    ? currentWeather
    : {};

  const handleClick = () => {
    navigate(`/map?lat=${location.lat}&lng=${location.lon}`);
  };

  return (
    <div className="bg-secondary_light min-h-screen dark:bg-secondary_dark">
      <Message type="secondary">Find your city`s weather</Message>

      <Search setInput={setInput} input={input} />
      {currentLoading && (
        <div className="flex justify-center pt-40 text-2xl">
          <Spinner />
        </div>
      )}
      {currentWeather?.cod !== "400" && currentWeather?.cod !== "404" ? (
        <div className="p-2 flex   flex-col gap-2">
          <div className=" mt-10 md:flex-row flex-col  text-primary_light flex gap-4 ">
            <div>
              <>
                <div className=" bg-triatary_light dark:bg-triatary_dark  p-3  animate-moveInLeft md:w-96 min-h-72 rounded-xl ">
                  <div className="flex h-3/5 border-b items-center justify-around">
                    <div>
                      <p className=" uppercase font-semibold text-sm  md:text-lg">
                        Now
                      </p>
                      <h1 className="md:text-[4rem] text-[2rem] font-bold">
                        {main?.temp.toFixed()}°
                      </h1>
                      <p className="uppercase font-medium tracking-wider">
                        {weather?.map((temp) => temp.description)}
                      </p>
                    </div>
                    {currentWeather?.weather?.map((temp) => temp.icon) ? (
                      <img
                        src={`https:${forecastDaysWeather?.current?.condition?.icon}`}
                        alt=""
                        className="md:w-40 md:h-40 "
                      />
                    ) : (
                      <div className="">
                        {/* <Spinner /> */}
                      </div>
                    )}
                  </div>
                  <div className="pt-5 font-medium flex items-center gap-3 uppercase tracking-wider ">
                    <div className="flex flex-col gap-3">
                      <h1>{forecastDaysWeather?.location?.localtime}</h1>
                      <h1 className="flex text-sm">
                        <span>{forecastDaysWeather?.location?.name}/</span>
                        {forecastDaysWeather?.location?.country}
                      </h1>
                    </div>
                    <div className="flex justify-center items-center gap-4 flex-wrap">
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
                  <Button type="weather" onClick={handleClick}>
                    Show on the map
                  </Button>
                </div>
              </>
            </div>

            <div className="bg-triatary_light animate-moveInBottom   dark:bg-triatary_dark md:w-screen rounded-xl p-4">
              <h1 className="font-semibold mb-3 text-primary_light/70">
                Todays Highlights
              </h1>
              <div className="flex md:flex-row flex-col gap-4">
                <div className="md:w-1/2">
                  <div>
                    <div className="dark:bg-secondary_dark p-5 rounded-xl  bg-secondary_light">
                      <div className="flex md:flex-row flex-col justify-between items-center">
                        <h1 className="font-semibold mb-3 text-primary_light/70">
                          Air Quality
                        </h1>
                        <span className="border border-green-200 rounded-full p-1 ">
                          Good
                        </span>
                      </div>
                      <div className="flex md:flex-row flex-col justify-around mt-2 items-center">
                        <RiWindyLine className="md:text-[5rem] text-[2.5rem]" />
                        <div className="flex gap-5 text-center">
                          <div>
                            <h3 className="text-sm text-primary_light/70">
                              PM 2.5
                            </h3>
                            <p className="md:text-[2.5rem] text-3xl">
                              {forecastDaysWeather?.current?.air_quality?.pm2_5}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm text-primary_light/70">
                              CO
                            </h3>
                            <p className="md:text-[2.5rem] text-3xl">
                              {forecastDaysWeather?.current?.air_quality?.co}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm text-primary_light/70">
                              NO2
                            </h3>
                            <p className="md:text-[2.5rem]  text-3xl">
                              {forecastDaysWeather?.current?.air_quality?.no2}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm text-primary_light/70">
                              SO2
                            </h3>
                            <p className="md:text-[2.5rem]  text-3xl">
                              {forecastDaysWeather?.current?.air_quality?.so2}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-5 mt-2 ">
                      <div className=" dark:bg-secondary_dark p-5 rounded-xl w-1/2  bg-secondary_light">
                        <h1 className="font-semibold mb-3 text-primary_light/70">
                          Humidity
                        </h1>
                        <div className="flex items-center gap-5 justify-between">
                          <WiHumidity className="text-[3rem]" />
                          <h1 className="font-semibold text-xl md:text-2xl">
                            {currentWeather?.main?.humidity}%
                          </h1>
                        </div>
                      </div>
                      <div className=" dark:bg-secondary_dark p-5 rounded-xl w-1/2  bg-secondary_light">
                        <h1 className="font-semibold mb-3 text-primary_light/70">
                          Pressure
                        </h1>
                        <div className="flex items-center gap-5 justify-between">
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
                    <div className="dark:bg-secondary_dark p-5 rounded-xl  bg-secondary_light">
                      <h1 className="font-semibold mb-5 text-primary_light/70">
                        Sunrise & Sunset
                      </h1>
                      <div className="flex  items-center justify-around">
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                          <WiSunrise className="text-[4rem]" />
                          <div>
                            <h3 className="font-semibold  text-primary_light/70">
                              Sunrise
                            </h3>
                            <h3 className="md:text-[2rem] font-semibold">
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
                        <div className="flex flex-col md:flex-row  gap-4 items-center">
                          <GiSunset className="text-[4rem]" />
                          <div>
                            <h3 className="font-semibold  text-primary_light/70">
                              Sunset
                            </h3>
                            <h3 className="md:text-[2.4rem] font-semibold">
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
                    <div className="flex justify-center gap-5 mt-2 ">
                      <div className=" dark:bg-secondary_dark p-5 rounded-xl w-1/2  bg-secondary_light">
                        <h1 className="font-semibold mb-3 text-primary_light/70">
                          Visibility
                        </h1>
                        <div className="flex items-center gap-5 justify-between">
                          <MdOutlineVisibility className="text-[3rem]" />
                          <h1 className="font-semibold md:text-2xl">
                            {visibility}
                          </h1>
                        </div>
                      </div>
                      <div className=" dark:bg-secondary_dark p-5 rounded-xl w-1/2  bg-secondary_light">
                        <h1 className="font-semibold mb-3 text-primary_light/70">
                          Feels Like
                        </h1>
                        <div className="flex items-center gap-5 justify-between">
                          <LiaTemperatureHighSolid className="text-[3rem]" />
                          <h1 className="font-semibold text-xl md:text-2xl">
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

          <div className="flex  md:flex-row flex-col gap-4">
            <div className="bg-triatary_light animate-moveInBottom  dark:bg-triatary_dark md:w-96 p-3 max-h-[33rem] rounded-xl text-primary_light">
              <h3 className="text-primary_light/70 uppercase font-semibold mb-2  text-lg">
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
                        <h2 className="font-semibold text-lg">
                          {temp ? days?.day?.avgtemp_f.toFixed() : days?.day?.avgtemp_c.toFixed() }°
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
            <div className="bg-triatary_light animate-moveInBottom p-3 dark:bg-triatary_dark md:w-3/4  rounded-xl text-primary_light">
              <h3 className="text-primary_light/70 uppercase font-semibold mb-5  text-lg">
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
                              <p className="font-semibold text-lg">
                                {curhour.time}
                              </p>
                              <img
                                src={`https:${curhour?.condition?.icon}`}
                                alt=""
                              />
                              <h3 className="font-semibold text-lg">
                                {temp ? curhour.temp_f.toFixed() : curhour.temp_c.toFixed() }°
                              </h3>
                            </div>
                          </div>
                        );
                      })
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
