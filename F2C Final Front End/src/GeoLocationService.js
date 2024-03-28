import React, { useState, useEffect } from 'react';
// import {  TextField } from '@material-ui/core';
// import { Dialog } from '@material-ui/core';

const GeoLocationService = () => {
  const [geoCoder, setGeoCoder] = useState(null);
  const [geoDetails, setGeoDetails] = useState({
    latitude: null,
    longitude: null,
    address: '',
  });

  // Add state for form values
//   const [formValues, setFormValues] = useState({
//     location: '',
//     latitude: '',
//     longitude: '',
//   });

  useEffect(() => {
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDCfYUhBh9Qg7PWPulV9sQOSJCw8zph8Ec&libraries=places`;
      script.onload = initializeGeoCoder;
      document.body.appendChild(script);
    };

    const initializeGeoCoder = () => {
      setGeoCoder(new window.google.maps.Geocoder());
    };

    loadGoogleMaps();
  }, []);

  const getAddress = (latitude, longitude) => {
    if (geoCoder) {
      geoCoder.geocode(
        { location: { lat: latitude, lng: longitude } },
        (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              let address = results[0].formatted_address;
              setGeoDetails({
                latitude: latitude,
                longitude: longitude,
                address: address,
              });
              console.log("Latitude ",latitude)
              console.log("Longitude ",longitude);
              
                
              // Update form values
            //   setFormValues({
            //     location: address,
            //     latitude: latitude,
            //     longitude: longitude,
            //   });
            } else {
              console.log('No results found');
            }
          } else {
            console.log('Geocoder failed due to: ' + status);
          }
        }
      );
    }
  };

  const setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        getAddress(latitude, longitude);
      });
    }
  };

//   const setLocation = () => {
//     // Use formValues to set form values or perform any other necessary actions
//     console.log('Location: ', formValues.location);
//     console.log('Latitude: ', formValues.latitude);
//     console.log('Longitude: ', formValues.longitude);
//   };

  // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

  return (
    <div>
      <button onClick={setCurrentLocation}>Get Current Location</button>
      <div>
        <p>Latitude: {geoDetails.latitude}</p>
        <p>Longitude: {geoDetails.longitude}</p>
        <p>Address: {geoDetails.address}</p>
      </div>
      {/* <form>
        <input
          label="Location"
          name="location"
          value={formValues.location}
          onChange={handleInputChange}
        />
        <input
          label="Latitude"
          name="latitude"
          value={formValues.latitude}
          onChange={handleInputChange}
        />
        <input
          label="Longitude"
          name="longitude"
          value={formValues.longitude}
          onChange={handleInputChange}
        />
        <button onClick={setLocation}>Set Location</button>
      </form> */}
    </div>
  );
};

export default GeoLocationService;
