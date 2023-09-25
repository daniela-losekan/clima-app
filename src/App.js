import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const api = {
  key: "3ee32176fbc4070662893138e0e9dea6",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState(""); 
  const [weather, setWeather] = useState({}); 

  useEffect(() => {
    if (query) {
      fetch(`${api.base}weather?q=${query}&lang=pt_br&units=metric&APPID=${api.key}`)
        .then(response => response.json())
        .then(data => setWeather(data));
    }
  }, [query]);

  const backgroundClass = weather.main?.temp > 15 ? "warm-bg" : "cold-bg";

  const visibilityIcon = weather.weather?.[0]?.icon;

  return (
    <div className={`App ${backgroundClass}`}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <form>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {weather.main && (
          <div className="weather-info">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <div className="weather-details">
              <p>{weather.weather[0].description}</p>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Visibility: {visibilityIcon}</p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

