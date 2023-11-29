const BASE_URL_2 = "https://api.weatherapi.com/v1";
const KEY_2 = "f11c76738c94466ab3b232410231811";
const KEY = "4306c0a7317483a94c9c55a4ce99b63a";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export default async function getCurrentWeather(city, unit = "imperial") {
  const res = await fetch(
    `${BASE_URL}weather?q=${city}&units=${unit}&appid=${KEY}`,
  );
  const data = await res.json();
  return data;
}

export async function getForecastWeather(city) {
  const res = await fetch(
    `${BASE_URL_2}/forecast.json?&key=${KEY_2}&q=${city}&days=7&aqi=yes&alerts=no`,
  );
  const data = await res.json();
  console.log(data);
  return data;
}
