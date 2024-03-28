import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate, useLocation } from 'react-router-dom';




import logo from '../src/logo3.png';
import PieChart from './PieChart'; // Make sure to provide the correct path






function QCDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const accessToken = Cookies.get('accessToken');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Add a state to track whether the profile fragment is visible
const [showProfileFragment, setShowProfileFragment] = React.useState(false);
  const logoutFunc = () => {
    Cookies.remove('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('phoneNo');
console.log("logoutexecuted");
    navigate('/signin');
  };




   // Toggle the visibility of the profile fragment
   const toggleProfileFragment = () => {
    setShowProfileFragment(!showProfileFragment);
  };



  //here actually I pass the paramters from QCViewFreqList Page
  const [pendingCount, setPendingCount] = useState(state?.pendingCount);
  const [approvedCount, setApprovedCount] = useState(state?.approvedCount);
  const [rejectedCount, setRejectedCount] = useState(state?.rejectedCount);







 
  return (
    <div className="qc-dashboard">
      <nav className="qcleft-navigation">
      <img className="logo" src={logo} alt="logo" />
        <ul>


        <Link to="/QCDashboard" >
        {/* <Link to="/QCDashboard" state={{ pendingCount, approvedCount, rejectedCount }}> */}
  <li>
    <button>Home</button>
  </li>
  </Link>




   <Link to ="/QCViewFReqList">   <li><button>Verification Request</button></li> </Link>  
       
   <Link to ="/QCWorkResponse">      <li><button>Handled Request</button></li></Link>
        <li><button>Notifications</button></li>
        <li><button>Settings</button></li>
        <li><button onClick={logoutFunc}  className="listfarmerdashboard">Logout</button></li>




</ul>
</nav>
<div className="content">
<header   className="qctop-navigation">
  {/* Add your top navigation content here */}
  <h1  className="welcome-text">Welcome to Quality Check Employee Portal</h1>
  <div className="profile-container">
  {/* Use onMouseEnter and onMouseLeave on the container */}
  <div className="qcprofile-container" onMouseEnter={toggleProfileFragment} onMouseLeave={toggleProfileFragment}>
    <button className="qcprofile-button">Profile</button>
    {/* Display the profile fragment when showProfileFragment is true */}
    {showProfileFragment && (
      <div className="profile-fragment">
        <ul>
        <li>
          <Link to="/ProfileCard"
                        state={{ pendingCount, approvedCount, rejectedCount }}
                      >
          <button>View Profile</button>  
          </Link>
          </li>
          <li><button>Edit Profile</button></li>
          <li><button onClick={logoutFunc}>Logout</button></li>
        </ul>
      </div>
    )}
  </div>
</div>
</header>
{/* Add your main content here */}
<div className="count-container">
<p>Pending Requests: {state?.pendingCount}</p>
<p>Approved Requests: {state?.approvedCount}</p>
<p>Rejected Requests: {state?.rejectedCount}</p>
</div>
{/* Display the Pie Chart */}
<div className="pie-chart-container">
  <h2>Request Status Distribution</h2>
  <PieChart data={{ pendingCount: state?.pendingCount, approvedCount: state?.approvedCount, rejectedCount: state?.rejectedCount }} />
</div>


</div>
</div>
);
}




export default QCDashboard;
