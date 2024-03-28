import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function ViewFtoCCRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  const accessToken = Cookies.get('accessToken');
  const adminUserId = localStorage.getItem('userId');

  useEffect(() => {
    fetchRequests();
  }, []);


  const fetchRequests = () => {
    axios
      .get(`/api/QCAdmin/allocated-farmer-requests/${adminUserId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          
        },
      })
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error); // Set error state
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Farmer-to-Call-Center Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? ( // Display error message if an error occurs
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {requests.map((request) => (
            <li key={request.requestId}>
              {/* Render request details here */}
              <p>Request ID: {request.requestId}</p>
              <p>Crop ID: {request.cropId}</p>
              <p>Farmer ID: {request.farmerId}</p>
              {/* Add more fields as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewFtoCCRequests;



/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function ViewFtoCCRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = Cookies.get('accessToken');
  const adminId = localStorage.getItem('userId');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    axios
      .get(`http://localhost:8080/api/roleccqc/allocated-farmer-requests/${adminId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setRequests(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching requests:', error);
        setLoading(false);
      });
  };

 

  return (
    <div>
      <h1>Farmer-to-Call-Center Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {requests.map((request) => (
            <li key={request.requestId}>
             
              <p>Request ID: {request.requestId}</p>
              <p>Crop ID: {request.cropId}</p>
              <p>Farmer ID: {request.farmerId}</p>
             
             
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewFtoCCRequests;
*/


