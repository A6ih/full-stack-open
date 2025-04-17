import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY;

const getWeather = (location) => {
  const request = axios.get(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${api_key}`
  );
  return request.then(response => response.data)
};

export default getWeather
