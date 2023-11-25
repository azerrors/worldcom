import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Button from "../ui/Button";
import Message from "../ui/Message";

import { BsWater } from "react-icons/bs";
import { CiTempHigh } from "react-icons/ci";
import { TiWeatherWindy } from "react-icons/ti";

import { getForecastWeather } from "../services/weatherApi";

function SideWeather({ info, setShow, lat, lng }) {
  const navigate = useNavigate();

  //array destruction
  const { name, main, weather, wind } = info ? info : {};

  //to return to the initial information screen
  const backToFirstDisplay = () => {
    {
      lat && lng && navigate(`?lat=${lat}&lng=${lng}`);
    }
    setShow((show) => !show);
  };

  //to display more weather infos
  const showMoreWeatherInfo = () => {
    {
      navigate(`/weather?name=${name}`);
    }
  };

  //fetch weather infos
  const { data: forecastDaysWeather} =
    useQuery({
      queryKey: ["icon", name],
      queryFn: () => getForecastWeather(name),
    });

  return (
    <div className="mt-28">
      {info?.name ? (
        <>
          <div className="flex items-center justify-around">
            <div className="animate-moveInLeft text-xl font-semibold uppercase tracking-widest">
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
              <div className="text-center text-2xl font-semibold">
                {main && <div>{Math.round(main?.temp)}°</div>}
              </div>
            </div>
          </div>
          <div className="mt-20  flex flex-wrap justify-around text-center uppercase tracking-widest ">
            <div className="animate-moveInTop">
              <h2 className="flex items-center gap-2 border-b border-stone-500 text-lg font-semibold ">
                <CiTempHigh />
                Feels Like
              </h2>
              <h2 className="font-medium ">
                {main && <div>{main?.temp.toFixed()}°</div>}
              </h2>
            </div>
            <div className="animate-moveInTop">
              <h2 className="flex items-center gap-2 border-b border-stone-500 text-lg font-semibold ">
                <BsWater />
                Humidity
              </h2>
              <h2 className="font-medium ">{main && main.humidity}%</h2>
            </div>
            <div className="animate-moveInTop">
              <h2 className="flex  items-center gap-2 border-b border-stone-500 text-lg font-semibold ">
                <TiWeatherWindy />
                WindSpeed
              </h2>
              <h2 className="font-medium ">{wind && wind.speed}MPH</h2>
            </div>
          </div>
          <div className="mr-8 mt-20 flex animate-moveInBottom justify-end gap-5 pb-10 md:mr-16">
            <Button type="weather" onClick={showMoreWeatherInfo}>
              More
            </Button>
            <Button type="weather" onClick={backToFirstDisplay}>
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
