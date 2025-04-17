const Display = ({ countries, onClick, getCapital, temp, wind}) => {
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
    getCapital(country.capital[0]);
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
        <h2>Weather in {country.capital[0]}</h2>
        <p>Temperature {temp} fahrenheit</p>
        <p>Wind Speed {wind} m/s</p>
      </div>
    );
  }
};

export default Display;