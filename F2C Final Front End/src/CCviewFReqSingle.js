import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './CCviewFReqSingle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
// not display data
import logo from '../src/logo3.png';
function CCviewFReqSingle() {
  const { requestId } = useParams();
   const { farmerId } = useParams();
   const [request, setRequest] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const accessToken = Cookies.get('accessToken');
   const navigate = useNavigate();
  const logoutFunc = () => {
    Cookies.remove('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('phoneNo');
console.log("logoutexecuted");
    navigate('/signin');
  };
  //  const adminId = localStorage.getItem('userId');
  
   useEffect(() => {
 fetchSingleRequest(farmerId, requestId);
  }, [farmerId, requestId]);
  
   const fetchSingleRequest = (farmerId, requestId) => {
   //setLoading(true);
   //setError(null);

   axios
      .get(`/api/QCAdmin/viewSingleRequest/${farmerId}/${requestId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the Authorization header with the access token
        },
      })
      .then((response) => {
        console.log(response.data);
       
        setRequest(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
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
      
       
    <div className='single-request-details'>
    <h1 className='qcview-detailsh1'>Request Details</h1>
    {loading ? (
      <p className="response-box">Loading...</p>
    ) : error ? (
      <p className="response-box">Error: {error.message}</p>
    ) : request ? (
      <div className='qcviewsinglereqdiv'>
      <div className='qcview-detail'>
        <strong className='qcview-detailsstrong'>Request ID:</strong>
        <div className='qcview-detail-value'>{request.requestId.slice(-22)}</div>
      </div>
      <div className='qcview-detail'>
        <strong className='qcview-detailsstrong'>Farmer ID:</strong>
        <div className='qcview-detail-value'>{request.farmerId}</div>
      </div>
    
      <div className='qcview-detail'>
        <strong className='qcview-detailsstrong'>Farmer Name:</strong>
        <div className='qcview-detail-value'>{request.farmerName}</div>
      </div>
    
      <div className='qcview-detail'>
        <strong className='qcview-detailsstrong'>Farmer Address:</strong>
        <div className='qcview-detail-value'>{request.farmerAddress}</div>
      </div>
    
      <div className='qcview-detail'>
        <strong className='qcview-detailsstrong'>Assigned CC ID:</strong>
        <div className='qcview-detail-value'>{request.assignedCCId}</div>
      </div>
    
     
    
      <div className='qcview-detail'>
        <strong className='qcview-detailsstrong'>Call Center Status:</strong>
        <div className='qcview-detail-value'>{request.handledCC}</div>
      </div>
    
      
      <div className='qcview-detail'>
        <strong className='qcview-detailsstrong'>Crop ID:</strong>
        <div className='qcview-detail-value'>{request.cropId.slice(-22)}</div>
      </div>
      <div className='qcview-detail'>
        <strong className='qcview-detailsstrong'>Crop Name:</strong>
        <div className='qcview-detail-value'>{request.cropName}</div>
      </div>
     
    </div>
      // <div className="response-box">
      //   <p className="response-paragraph">Request ID: {request.requestId}</p>
      //   <p className="response-paragraph">CropId: {request.cropId}</p>
      //   <p className="response-paragraph">FarmerId: {request.farmerId}</p>
      //   <p className="response-paragraph">Farmer Name: {request.farmerName}</p>
      //   <p className="response-paragraph">Farmer Address: {request.farmerAddress}</p>
      //   <p className="response-paragraph">Farmer Contact:{request.farmerContact}</p>
      //   <p className="response-paragraph">Farmer Email:{request.farmerEmail}</p>
      //   {/* Add more fields as needed */}
      // </div>
    ) : (
      <p className="response-box">No data found for this request.</p>
    )}
  </div>
  
 
    </div>
  </div>

  );
}

export default CCviewFReqSingle;


/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
 
function CCviewFReqSingle() {
  const { requestId } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const adminId = localStorage.getItem('userId'); // Get adminId from localStorage

  useEffect(() => {
    fetchSingleRequest(adminId, requestId);
  }, [adminId, requestId]);

  const fetchSingleRequest = (adminId, requestId) => {
    setLoading(true);
    setError(null);

    axios
      .get(`/api/roleccqc/viewSingleRequest/${adminId}/${requestId}`)
      .then((response) => {
        setRequest(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Single Request Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : request ? (
        <div>
          <p>Request ID: {request.requestId}</p>
          <p>Other Data: {request.otherData}</p>
         
        </div>
      ) : (
        <p>No data found for this request.</p>
      )}
    </div>
  );
}

export default CCviewFReqSingle;
*/
