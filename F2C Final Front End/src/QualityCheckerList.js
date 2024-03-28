import React from 'react';
import './QualityCheckerList.css'; 
const QualityCheckerList = () => {
  const qualityCheckers = [
    {
      firstName: 'Pranjali',
      lastName: 'Suryavanshi',
      email: 'ps@example.com',
      phone: '7745872652',
      address: 'Kolhapur',
      available: true,
    },
    {
      firstName: 'Srushti',
      lastName: 'Karoshi',
      email: 'sk@example.com',
      phone: '7418529635',
      address: 'pune',
      available: true,
    },
    {
      firstName: 'Parth',
      lastName: 'Patil',
      email: 'pp@example.com',
      phone: '7083985610',
      address: 'kop',
      available: false,
    },
    // Add more quality checkers as needed
  ];

  return (
    <div>
      <h1>Quality Checkers List</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {qualityCheckers.map((checker, index) => (
            <tr key={index}>
              <td>{checker.firstName}</td>
              <td>{checker.lastName}</td>
              <td>{checker.email}</td>
              <td>{checker.phone}</td>
              <td>{checker.address}</td>
              <td className={checker.available ? 'status-available' : 'status-unavailable'}>
                {checker.available ? 'Available' : 'Unavailable'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QualityCheckerList;
