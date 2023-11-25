const KEY = "tCqxxL3pyTpwSQDJ3UnXShy0eznBt1xFMOvvJCox";
const BASE_URL = "https://countryapi.io/api/";

async function countryApi(name) {
  const res = await fetch(`${BASE_URL}name/${name}?apikey=${KEY}`);
  const data = await res.json()
  return data
}

export default countryApi;
