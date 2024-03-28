import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const SingleFarmerDisplay = () => {
  const [farmers, setFarmers] = useState([]);
   const {name} = useParams();
  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        console.log(name);
        const response = await axios.get(`http://localhost:8080/farmers/getFarmer/${name}`);
        // const data = await response.json();
        setFarmers(response);
      } catch (error) {
        console.error('Error fetching farmers:', error);
      }
    };

    fetchFarmers();
  }, [name]);

  return (
    <div>
      <h2>Farmer List</h2>
      <ul>
        {/* {farmers && farmers.map((farmer) => (
          <li key={farmer.id}>
            <p>Name: {farmer.name}</p>
            <p>Phone: {farmer.phone}</p>
            <p>Address: {farmer.address}</p>
            {farmer.image && (
              <img src={`data:image/png;base64,${farmer.image}`} alt={farmer.name} />
            )}
          </li>
        ))} */}
        <p>{name}</p>
          <p>Name: {farmers.name}</p>
            <p>Phone: {farmers.phone}</p>
            <p>Address: {farmers.address}</p>
            {farmers.image && (
              <img src={`data:image/png;base64,${farmers.image}`} alt={farmers.name} />
            )}
      </ul>
    </div>
  );
};

export default SingleFarmerDisplay;
