const KEY = "4306c0a7317483a94c9c55a4ce99b63a";
const KEY_2 = "f11c76738c94466ab3b232410231811";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const BASE_URL_2 = "http://api.weatherapi.com/v1";
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

export default async function getCurrentWeather(city , unit = "imperial") {
  const res = await fetch(
    `${BASE_URL}weather?q=${city}&units=${unit}&appid=${KEY}`
  );
  const data = await res.json();
  // console.log(data);
  return data;
}

export async function get5DaysWeather(city) {
  const res = await fetch(
    `${BASE_URL}forecast?q=${city}&units=imperial&appid=${KEY}`
  );
  const {list} = await res.json();
  // console.log(data);
  return list;
}
export async function getForecastWeather(city) {
  const res = await fetch(
    `${BASE_URL_2}/forecast.json?&key=${KEY_2}&q=${city}&days=7&aqi=yes&alerts=no`
  );
  const data = await res.json();
  // console.log(data)
  return data;
}

// export async function getCityLocation(city) {
//   const res = await fetch(`${BASE_URL2}q=${city}&limit=5&appid=${KEY}`);
//   const data = await res.json();
//   // console.log(data);
//   return data;
// }



// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
