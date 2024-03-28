// src/components/ReverseGeocoding.js

import React, { useState } from 'react';
import axios from 'axios';

const ReverseGeocode = () => {
  const [coordinates, setCoordinates] = useState({ lat: '', lon: '' });
  const [address, setAddress] = useState('');

  const handleReverseGeocode = () => {
    axios
      .get(`https://us1.locationiq.com/v1/reverse.php?key=pk.337fac4c4fa14b104729eff773cd9895&lat=${coordinates.lat}&lon=${coordinates.lon}&format=json`)
      .then((response) => {
        setAddress(response.data.display_name);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Reverse Geocoding</h2>
      <div>
        <label htmlFor="latInput">Latitude: </label>
        <input
          type="text"
          id="latInput"
          value={coordinates.lat}
          onChange={(e) => setCoordinates({ ...coordinates, lat: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="lonInput">Longitude: </label>
        <input
          type="text"
          id="lonInput"
          value={coordinates.lon}
          onChange={(e) => setCoordinates({ ...coordinates, lon: e.target.value })}
        />
      </div>
      <button onClick={handleReverseGeocode}>Reverse Geocode</button>
      <p>Coordinates: {coordinates.lat}, {coordinates.lon}</p>
      <p>Address: {address}</p>
    </div>
  );
};

export default ReverseGeocode;
