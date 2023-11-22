const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

async function locationApi({ lat, lng }) {
  const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
  const data = await res.json();

  return data;
}

export default locationApi;
