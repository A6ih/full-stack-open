import { useState, useEffect } from "react";
import getAllCountries from "./allCountries";

const Display = ({ countries, onClick }) => {
  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>;
  if (countries.length <= 10 && countries.length > 1) {
    return (
      <>
        <ul>
          {countries.map((country) => (
            <li key={country.name.common}>
              {country.name.common}{" "}
              <button onClick={() => onClick(country.name.common)}>Show</button>
            </li>
          ))}
        </ul>
      </>
    );
  }
  if (countries.length === 1) {
    const country = { ...countries[0] };
    const languages = Object.values(country.languages);
    console.log(languages);
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
    );
  }
};

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [showCountries, setShowCountries] = useState([]);

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

  useEffect(() => {
    getAllCountries().then((array) => setAllCountries(array));
  }, []);

  console.log(showCountries);

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
        <Display countries={showCountries} onClick={handleShowButton} />
      )}
    </div>
  );
};

export default App;
