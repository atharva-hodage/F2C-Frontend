import React, { useState, useEffect } from 'react';
import './CCDashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import logo from '../src/logo3.png';

//import PieChartCC from './PieChartCC'; // Make sure to provide the correct path
import PieChartCC from './PieChartCC';
import axios from 'axios';

function CCDashboard() {

    

 const [requests, setRequests] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const accessToken = Cookies.get('accessToken');
 const adminId = localStorage.getItem('userId');
 //to maintain counts for piechart
  const [pendingCount, setPendingCount] = useState(0);
  const [assignedCount, setAssignedCount]  = useState(0);
  const [totalRequests, setTotalRequests]  = useState(0);

  const navigate = useNavigate();

    const logoutFunc = () => {
      Cookies.remove('accessToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('phoneNo');
  console.log("logoutexecuted");
      navigate('/signin');
    };

    useEffect(() => {
      fetchRequests();
    }, []);

 //allocated farmer request api is called to maintain count
 const fetchRequests = () => {
  axios
    .get(`/api/QCAdmin/allocated-farmer-requests/${adminId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      setRequests(response.data);
      updateCounts(response.data);
      setTotalRequests(response.data.length); // Update total request count
      setLoading(false);
      console.log(response.data);
    })
    .catch((error) => {
      setError(error);
      setLoading(false);
    });
};

//update count function
const updateCounts = (requests) => {
  let pending = 0;
  let assigned = 0;

  requests.forEach((request) => {
    if (request.handledCC === 'processing') {
      pending++;
    } else if (request.handledCC === 'Completed') {
      assigned++;
    }
  });

  setPendingCount(pending);
  setAssignedCount(assigned);
};

  return (
    <div className="qc-dashboard">
      <nav className="ccleft-navigation">
      <img className="logo" src={logo} alt="logo" />

      <ul>
        <Link to="/CCDashboard" >
        {/* <Link to="/QCDashboard" state={{ pendingCount, approvedCount, rejectedCount }}> */}
  <li>
    <button>Home</button>
  </li>

  </Link> 
      <Link to ="/CCViewFReqList">   <li><button >Farmer's Request List</button></li> </Link> 
    {/* <Link to ="/allqc"  >  <li><button>Quality Check List</button></li> </Link>  */} 

    <Link to ="/CCWorkResponse">      <li><button>Handled Request</button></li></Link>
          


          <li><button >Notifications</button></li>
          <li><button>Settings</button></li>
         <li><button onClick={logoutFunc}  className="listfarmerdashboard">Logout</button></li>

        </ul>
      </nav>
      <div className="content">
        <header   className="cctop-navigation">
          {/* Add your top navigation content here */}
          <h1  className="welcome-text">Welcome to Call Center Employee Portal</h1>
                  
          {/* Notification icon */}
            <div className="notification-icon">
            <i className="fas fa-bell"></i>
          </div>
          <button className="profile-button">Profile</button>
  
        </header>
        
             {/* Add your main content here */}
             <div className="count-container">
        <p>Pending Requests: {pendingCount}</p>
        <p>Assigned Requests: {assignedCount}</p>
        <p>Total Requests: {totalRequests}</p>
      </div>
        {/* <div className="search-filter">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
          />
          <button className="search-button">Search</button>
        </div> */}
        {/* Add your main content here */}
         {/* Search filter */}
        
        
         {/* Display the Pie Chart */}
  <div className="pie-chart-container">
          <h2>Request Status Distribution</h2>
          <PieChartCC data={{ pendingCount:pendingCount, assignedCount: assignedCount, totalRequests: totalRequests }} />
        </div>

        
   
      </div>
    </div>
  );
}

export default CCDashboard;