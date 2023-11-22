import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Message from "../ui/Message";
import FtoC from "../utilites/FtoC";
// import WeatherIcon from "../utilites/WeatherIcon";
import { useQuery } from "@tanstack/react-query";
import { BsWater } from "react-icons/bs";
import { CiTempHigh } from "react-icons/ci";
import { TiWeatherWindy } from "react-icons/ti";
import { getForecastWeather } from "../services/weatherApi";

function SideWeather({ info, setShow, lat, lng }) {
  const { name, main, weather, wind } = info ? info : {};
  const navigate = useNavigate();

  const handleClick = () => {
    {
      lat && lng && navigate(`?lat=${lat}&lng=${lng}`);
    }
    setShow((show) => !show);
  };
  const handleClick2 = () => {
    {
      navigate(`/weather?name=${name}`);
    }
  };

  const { data: forecastDaysWeather, isLoading: forecastDaysWeatherLoading } =
    useQuery({
      queryKey: ["icon", name],
      queryFn: () => getForecastWeather(name),
    });
  console.log(forecastDaysWeather);
  // src={`https:${forecastDaysWeather?.current?.condition?.icon}`}

  return (
    <div className="mt-28">
      {info?.name ? (
        <>
          <div className="flex items-center justify-around">
            <div className="uppercase text-xl font-semibold tracking-widest animate-moveInLeft">
              {name && name}
            </div>
            <div className="animate-moveInRight">
              {weather?.map((weather) => {
                return (
                  <img
                    src={`https:${forecastDaysWeather?.current?.condition?.icon}`}
                    key={weather.id}
                    alt=""
                    className="w-40 "
                  />
                );
              })}
              <div className="text-center font-semibold text-2xl">
                {main && <div>{Math.round(main?.temp)}°</div>}
              </div>
            </div>
          </div>
          <div className="flex  flex-wrap justify-around mt-20 tracking-widest text-center uppercase ">
            <div className="animate-moveInTop">
              <h2 className="font-semibold flex items-center text-lg gap-2 border-b border-stone-500 ">
                <CiTempHigh />
                Feels Like
              </h2>
              <h2 className="font-medium ">
                {main && <div>{main?.temp.toFixed()}°</div>}
              </h2>
            </div>
            <div className="animate-moveInTop">
              <h2 className="font-semibold flex items-center gap-2 text-lg border-b border-stone-500 ">
                <BsWater />
                Humidity
              </h2>
              <h2 className="font-medium ">{main && main.humidity}%</h2>
            </div>
            <div className="animate-moveInTop">
              <h2 className="font-semibold  flex items-center gap-2 text-lg border-b border-stone-500 ">
                <TiWeatherWindy />
                WindSpeed
              </h2>
              <h2 className="font-medium ">{wind && wind.speed}MPH</h2>
            </div>
          </div>
          <div className="mt-20 gap-5 flex animate-moveInBottom justify-end mr-8 pb-10 md:mr-16">
            <Button type="weather" onClick={handleClick2}>
              More
            </Button>
            <Button type="weather" onClick={handleClick}>
              Back
            </Button>
          </div>
        </>
      ) : (
        <Message type="primary">
          OOPS We couldn`t find information about your location
        </Message>
      )}
    </div>
  );
}

export default SideWeather;
