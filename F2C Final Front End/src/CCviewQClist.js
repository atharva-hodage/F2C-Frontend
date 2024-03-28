import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

// working - add data

function CCViewQCList() {
  const [qualityCheckers, setQualityCheckers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = Cookies.get('accessToken');

  useEffect(() => {
    fetchQualityCheckers();
  }, []);

  const fetchQualityCheckers = () => {
    axios
      .get('/api/roleccqc/quality-checkers', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setQualityCheckers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Quality Checkers List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="centered-table-container">
          {/* Centering container */}
          <table className="table-container">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>phone no</th>
                {/* Add more fields as needed */}
              </tr>
            </thead>
            <tbody>
              {qualityCheckers.map((qc) => (
                <tr key={qc.id}>
                  <td>{qc.id}</td>
                  <td>{qc.firstName}</td>
                  <td>{qc.email}</td>
                  <td>{qc.address}</td>
                  <td>{qc.phoneNo}</td>
                  {/* Add more fields as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
  
}

export default CCViewQCList;
