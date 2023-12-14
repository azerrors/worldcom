import { CgCloseR } from "react-icons/cg";

import countryCodeToFlag from "../utilites/ChangeToFlag";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useWorld } from "../context/WorldContext";
import { toast } from "react-toastify";

function FavElement({ data }) {
  const navigate = useNavigate();
  const { dispatch } = useWorld();

  const { city, longitude, latitude, countryName, locality, countryCode } = data
    ? data
    : {};

  //to return to the initial information screen
  const showMoreWeatherInfo = () => {
    {
      navigate(`/weather?name=${city}`);
    }
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
  //to display more weather infos
  const displayOnMap = () => {
    navigate(`/map?lat=${latitude}&lng=${longitude}`);
    dispatch({
      type: "display",
      payload: { lng: longitude, lat: latitude },
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

  return (
    <div className="w-64  rounded-lg  border border-primary_light p-5">
      <div className="flex items-center justify-between gap-14">
        <div>
          <div>{countryName}</div>
          <div>
            {city}/{locality}
          </div>
        </div>
        <div>{flagemojiToPNG(countryCodeToFlag(countryCode))}</div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className=" flex gap-2">
          <Button type="weather_sm" onClick={showMoreWeatherInfo}>
            weather
          </Button>
          <Button type="weather_sm" onClick={displayOnMap}>
            Map
          </Button>
        </div>
        <CgCloseR
          className="cursor-pointer text-2xl text-red-700 transition-all duration-200 hover:-translate-y-1 active:translate-y-1"
          onClick={deleteFav}
        />
      </div>
    </div>
  );
}

export default FavElement;
