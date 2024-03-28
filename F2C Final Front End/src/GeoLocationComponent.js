import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GeolocationComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);

            // Call MapQuest Geocoding API to get the address based on coordinates
            // const apiKey = 'Fqww7vWjyMVhTG0CPUxXrGgRTOtJ94jC';
            const apiUrl = `https://us1.locationiq.com/v1/reverse.php?key=pk.337fac4c4fa14b104729eff773cd9895&lat=${latitude}&lon=${longitude}&format=json`;

            axios
              .get(apiUrl)
              .then((response) => {
                console.log(response.data.display_name)
                const results = response.data.results[0];
                const location = results.locations[0];
                const formattedAddress =
                  location.street +
                  ', ' +
                  location.adminArea5 +
                  ', ' +
                  location.adminArea3 +
                  ' ' +
                  location.postalCode;
                setAddress(formattedAddress);
              })
              .catch((error) => {
                console.error('Error fetching geolocation data', error);
              });
          },
          (error) => {
            console.error('Error getting geolocation', error);
          }
        );
      } else {
        alert('Geolocation is not supported in your browser.');
      }
    };

    fetchGeolocation();
  }, []);

  return (
    <div>
      <h1>Geolocation Details</h1>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      <p>Address: {address}</p>
    </div>
  );
};

export default GeolocationComponent;


//