
// here only show assigned QC req , as in CCviewFReqlist show all request
// or can remove that assigned QC req from CCviewFReqlist, and show here only 

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from React Router
import './CCviewFReqlist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
//import { useHistory } from 'react-router-dom';
import logo from '../src/logo3.png';


function CCWorkResponse() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = Cookies.get('accessToken');
  const adminId = localStorage.getItem('userId');
  const [available,setAvailable]=useState();

  const navigate = useNavigate();

  const [isButtonDisabled, setButtonDisabled] = useState(false);


    const logoutFunc = () => {
      Cookies.remove('accessToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('phoneNo');
      console.log("logoutexecuted");
      navigate('/signin'); 
    };
  useEffect(() => {
    fetchRequests();
  }, [available]);

  const fetchRequests = () => {
    axios
      .get(`/api/QCAdmin/assigned-farmer-requests/${adminId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
        console.log('data :' , response.data);
     
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

 
  const handleViewRequest = (farmerId, requestId) => {
  navigate(`/CCviewFReqSingle/${farmerId}/${requestId}`);
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
        <button className="profile-button">
            <FontAwesomeIcon icon={faUserCircle}  className="profile-icon" />
          </button>

      </header>

      
       <div className='ccviewfreqlistdivcontainer'>
      <h1 className='ccviewreqlisth1'>Farmer Assigned Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="centered-table-container">
         
          <table className="table-container">
            <thead className="ccviewqcreqlistthead">
              <tr>
                <th>Request ID</th>
                {/* <th>Crop ID</th> */}
                
                <th>Farmer Name</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th>Crop Name</th>
                <th>Assigned QC ID</th>
                <th>Action</th> {/* Add a new column for the action button */}
            
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr className='ccviewfreqlisttr' key={request.requestId}>
                  <td>{request.requestId.slice(-6)}</td>
                  {/* <td>{request.cropId}</td> */}
                  
                  <td>{request.farmerName}</td>
                  <td>{request.farmerAddress}</td>
                  <td>{request.farmerContact}</td>
                  <td>{request.cropName}</td>
                  <td>{request.assignedQCId}</td>
                   
                   <td>
<button className='viewbuttoncc' onClick={() => handleViewRequest(request.farmerId,request.requestId)}>View</button>
</td>
                   

    




                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
 
    </div>
  </div>
   
  );
}

export default CCWorkResponse;

