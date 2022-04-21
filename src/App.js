import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWind} from '@fortawesome/free-solid-svg-icons';

const api = {
  key: "dba42959038ad6ad33d0abc7a77ff789",
  base: "https://api.openweathermap.org/data/2.5/"
}

export default function App() {
 
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result)
        });
    }
  }

  const dateBuilder = (dt) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[dt.getDay()];
    let date = dt.getDate();
    let month = months[dt.getMonth()];
    let year = dt.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 27) ? 'app hot' : 'app cool') : 'app'}>
      <nav className= 'nav'>WEATHER</nav>
      <main>
        <div className='search-box'>
          <input 
          type='text'
          className ='search-bar'
          placeholder='Search for a city'
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}°c</div>
              <div style={{color: '#fff'}}>Humidity: {Math.round(weather.main.humidity)}%</div>
              <div className='weather'>{weather.weather[0].description}</div>
            </div>
            <div className='others-box'>
              <div className='windSpeed'>{weather.wind.speed}Km/h</div>
              <div className='windIcon'><FontAwesomeIcon icon={faWind}/></div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );

  
}