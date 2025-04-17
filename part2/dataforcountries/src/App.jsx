import { useState, useEffect } from "react";
import getAllCountries from "./allCountries";
import getWeather from "./services/weatherApi";
import Display from "./components/display";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [showCountries, setShowCountries] = useState([]);
  const [capital, setCapital] = useState("");
  const [temperature, setTemperature] = useState("");
  const [wind, setWind] = useState("");

  useEffect(() => {
    getAllCountries().then((array) => setAllCountries(array));
  }, []);

  useEffect(() => {
    getWeather(capital).then((response) => {
      setTemperature(response.currentConditions.temp);
      setWind(response.currentConditions.windspeed);
    });
  }, [capital]);

  const updateSearch = (event) => {
    event.preventDefault();
    const string = event.target.value.toLowerCase();
    setSearch(string);
    setShowCountries(
      allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(string)
      )
    );
  };

  const handleShowButton = (search) => {
    setShowCountries(
      showCountries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <div>
      <p>
        Find Countries <input value={search} onChange={updateSearch} />
      </p>
      {!search ? null : (
        <Display
          countries={showCountries}
          onClick={handleShowButton}
          getCapital={setCapital}
          temp={temperature}
          wind={wind}
        />
      )}
    </div>
  );
};

export default App;
