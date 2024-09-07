import React, { useState } from 'react';
import axios from 'axios';


const App = () => {
  const [city, setCity] = useState("");
  const [weather, selectWeather] = useState(null);
  const apikey = "7449add7346d4557a86122414240609";

  const getWeather = (e) => {
    e.preventDefault();

    // Fetch weather data for the entered city
    axios
      .get(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`)
      .then((response) => {
        selectWeather(response.data);
      })
      .catch((error) => {
        console.log("Error GETTING DATA", error);
        alert("Correct The Country");
      });

    setCity(""); // Reset input field after submission
  };

  return (
    <div id="particles-js"  style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>ENTER YOUR CITY NAME</h1>
      <form onSubmit={getWeather}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}  // Corrected onChange handler
          placeholder="Enter City Name"
          style={{
            padding: "10px",
            width: "200px",
            margin:"10px"
          }}
        />
        <button type="submit" style={{ padding: "10px" }}>
          Submit
        </button>
      </form>

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h2>
            {weather.location.name}, {weather.location.country}
          </h2>
          <p>{weather.current.temp_c}°C</p>
          <p>Feels Like: {weather.current.feelslike_c}°C</p>
          <p>Wind Speed: {weather.current.wind_kph} km/h</p>
          <p>{weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="Weather Icon" />
        </div>
      )}
    </div>
  );
};

export default App;
