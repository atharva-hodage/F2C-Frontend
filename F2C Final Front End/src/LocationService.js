import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationService = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = 'AIzaSyDB2ZL5zOM1IAi9d407Tg9Zj6urGqmb4so';
    const apiUrl = `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`;


    axios
      .post(apiUrl, { 
        "considerIp": true,
        // "locationAreaCode": 416012,
      "mobileCountryCode": 404,
      "mobileNetworkCode": 15, 
    }, 
        { 
            headers: { 'Content-Type': 'application/json' }
        }
        )
      .then((response) => {
        setLatitude(response.data.location.lat);
        setLongitude(response.data.location.lng);
      })
      .catch((err) => {
        setError('Error fetching location');
      });
  }, []);

  return (
    <div>
      <h1>Geolocation Example</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <p>
          Latitude: {latitude}, Longitude: {longitude}
        </p>
      )}
    </div>
  );
};

export default LocationService;
// import React, { useState, useEffect } from 'react';

// function App() {
//   const [latitude, setLatitude] = useState('16.68283918808754');
//   const [longitude, setLongitude] = useState('74.23016978415576');
//   const [apiKey, setApiKey] = useState('AIzaSyDB2ZL5zOM1IAi9d407Tg9Zj6urGqmb4so'); 
//   const [address, setAddress] = useState('');

//   useEffect(() => {
//     const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

//     fetch(apiUrl)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.status === 'OK') {
//           const formattedAddress = data.results[0].formatted_address;
//           setAddress(formattedAddress);
//         } else {
//           setAddress('Error: Unable to retrieve address');
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         setAddress('Error: Unable to retrieve address');
//       });
//   }, [latitude, longitude, apiKey]);

//   return (
//     <div>
//       <h1>Geocoding Example</h1>
//       <p>Latitude: {latitude}</p>
//       <p>Longitude: {longitude}</p>
//       <p>Address: {address}</p>
//     </div>
//   );
// }

// export default App;