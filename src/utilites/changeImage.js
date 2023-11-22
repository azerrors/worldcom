import React from "react";

export default function changeImage(iconCode ) {
  const iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
  return iconUrl;
}
