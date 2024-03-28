import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './QCViewFReqSingle.css';
// import {AnimateGroup} from 'react-animate-mount';
import { motion } from "framer-motion";
// not display data
import logo from '../src/logo3.png';
import animationJSON from "./success2.json";
function QCviewFReqSingle() {
  const { requestId } = useParams();
  // const animationJSON = require("./success2.json");
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(false);
  // const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  // Get the access token from cookies
  const accessToken = Cookies.get('accessToken');
const navigate = useNavigate();
  useEffect(() => {
    fetchSingleRequest(requestId, accessToken);
  }, [requestId, accessToken]);
  
  const initialVariants = {
    opacity: 0,
    scale: 0.9,
  };

  const animateVariants = {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      bounce:0.8,
    },
  };

  const [isVisible, setIsVisible] = useState(false);



  const fetchSingleRequest = (requestId, accessToken) => {
    setLoading(true);
    setError(null);

    axios
      .get(`/api/QCAdmin/${requestId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setRequest(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };


  const handleApprove = () => {
    navigate('/CCviewFReqlist')
    // axios
    //   .post(`/api/QCAdmin/approve/${requestId}`, null, {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       setIsVisible(true);
    //       // setSuccess(true);
    //       // setIsPopUpVisible(true);
    //       // You can also display an alert here
    //       // alert('You have approved the farmer request successfully.');
    //     }
    //   })
    //   .catch((error) => {
    //     // Handle errors here
    //     console.error('Error approving request:', error);
    //   });
  };
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
          <li><button>Logout</button></li>
        </ul>
      </nav>
      <div className="content">
        <header   className="qctop-navigation">
          {/* Add your top navigation content here */}
          <h1  className="welcome-text">Welcome to Quality Check Employee Portal</h1>
          <button className="qcprofile-button">Profile</button>
        </header>
        {/* Add your main content here */}
        <div className='qcviewsinglereqdivcontainer'>
        <div className="qcviewsinglereqcontainer">
    <h1 className='qcviewsinglereqh1'>Single Request Details</h1>
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p className="error">Error: {error.message}</p>
    ) : request ? (
      <div className='qcviewsinglereqdiv'>
  <div className='qcview-detail'>
    <strong>Request ID:</strong>
    <div className='qcview-detail-value'>{request.requestId}</div>
  </div>

 

  <div className='qcview-detail'>
    <strong>Farmer ID:</strong>
    <div className='qcview-detail-value'>{request.farmerId}</div>
  </div>

  <div className='qcview-detail'>
    <strong>Farmer Name:</strong>
    <div className='qcview-detail-value'>{request.farmerName}</div>
  </div>

  <div className='qcview-detail'>
    <strong>Farmer Address:</strong>
    <div className='qcview-detail-value'>{request.farmerAddress}</div>
  </div>

  <div className='qcview-detail'>
    <strong>Assigned CC ID:</strong>
    <div className='qcview-detail-value'>{request.assignedCCId}</div>
  </div>

  <div className='qcview-detail'>
    <strong>Assigned QC ID:</strong>
    <div className='qcview-detail-value'>{request.assignedQCId}</div>
  </div>

  <div className='qcview-detail'>
    <strong>Call Center Status:</strong>
    <div className='qcview-detail-value'>{request.handledCC}</div>
  </div>

  <div className='qcview-detail'>
    <strong>Quality Check Status:</strong>
    <div className='qcview-detail-value'>{request.handledQC}</div>
  </div>
  <div className='qcview-detail'>
    <strong>Crop ID:</strong>
    <div className='qcview-detail-value'>{request.cropId}</div>
  </div>
  <div className='qcview-detail'>
    <strong>Crop Name:</strong>
    <div className='qcview-detail-value'>{request.cropName}</div>
  </div>
  <button onClick={handleApprove} className="approve-button">Back</button>
 
 {isVisible && <motion.div
      initial={initialVariants}
      animate={animateVariants} style={{
        position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 200,
          backgroundColor: "#ffffff",
          border: "1px solid #cccccc",
          borderRadius: 5,
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
      }}  className='pop-up-screen'
      
    >
       <motion.lottie src={animationJSON} loop autoplay />
      <h1>Request Approved Successfully</h1>
     
      <button onClick={() => setIsVisible(false)}>Close</button>
    </motion.div>}
  {/* {success && <p className="success-messageqcviewsingle">Request approved successfully.</p>} */}
</div>

    ) : (
      <p>No data found for this request.</p>
    )}
  </div>
        </div>
      
      </div>
    </div>

);
  
}

export default QCviewFReqSingle;


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
