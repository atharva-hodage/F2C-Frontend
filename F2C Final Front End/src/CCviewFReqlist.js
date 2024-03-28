import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from React Router
import './CCviewFReqlist.css';
import { faUserCircle, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NotificationModal from './NotificationModal';
//import { useHistory } from 'react-router-dom';
import logo from '../src/logo3.png';




function CCviewFReqlist() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = Cookies.get('accessToken');
  const adminId = localStorage.getItem('userId');
  const [available,setAvailable]=useState();
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

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
      fetchNotifications();
    }, []);
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`/api/QCAdmin/notifications/${adminId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setNotifications(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  const fetchRequests = () => {
    axios
      .get(`/api/QCAdmin/allocated-farmer-requests/${adminId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };
  const handleChangeStatus = async () => {
   // setIsLoading(true);


    try {
      const response  = await axios.post(`/api/QCAdmin/setEmptyRequestFieldCCQC/${adminId}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      const available = response.data.ccAvailable;
      console.log(available);
      setAvailable(available);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAssignQC = (requestId, isHandledByCC) => {
    // Check if isHandledByCC is true, then don't proceed
    if (isHandledByCC) {
      setButtonDisabled(true);
      return;
    }

    navigate(`/CCviewQCFreeLoc/${requestId}`);
   
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
    
        <li><button onClick={() => setShowModal(true)}>Notifications</button></li>
        <li><button>Settings</button></li>
        <li><button onClick={logoutFunc} className="listfarmerdashboard">Logout</button></li>
      </ul>
    </nav>
    <div className="content">
      <header className="cctop-navigation">
        <h1 className="welcome-text">Welcome to Call Center Employee Portal</h1>
        <div className="notification-icon" onClick={() => setShowModal(true)}>
  <FontAwesomeIcon icon={faBell} />
  {notifications.length > 0 && (
    <span className="notification-badge">{notifications.length}</span>
  )}
</div>
        <button className="profile-button">
          <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
        </button>
      </header>
      <div className='ccviewfreqlistdivcontainer'>
        <h1 className='ccviewreqlisth1'>Farmer Verification Requests</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className="centered-table-container">
            <div className='statusbuttonCCdiv'>
              <label className='statusbuttonCClabel'>Status :</label>
              <button className="statusbuttonCC" onClick={handleChangeStatus}>
                <label>{available ? 'Free' : 'Busy'}</label>
              </button>
            </div>
            <table className="table-container">
              <thead className="ccviewqcreqlistthead">
                <tr>
                  <th>Request ID</th>
                  <th>Farmer Name</th>
                  <th>Address</th>
                  <th>Contact Number</th>
                  <th>Crop Name</th>
                  <th>Action</th>
                  <th>Assign QC</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr className='ccviewfreqlisttr' key={request.requestId}>
                    <td>{request.requestId.slice(-6)}</td>
                    <td>{request.farmerName}</td>
                    <td>{request.farmerAddress}</td>
                    <td>{request.farmerContact}</td>
                    <td>{request.cropName}</td>
                    <td>
                      <button className='viewbuttoncc' onClick={() => handleViewRequest(request.farmerId, request.requestId)}>View</button>
                    </td>
                    
                    <td>
              <button
                className='assignqcbuttoncc'
                onClick={() => handleAssignQC(request.requestId, request.isHandledByCC)}
                disabled={request.isHandledByCC || isButtonDisabled}
              >
                Assign
              </button>
            </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    {showModal && (
  <NotificationModal notifications={notifications} onClose={() => setShowModal(false)} />
)}
  </div>
   
  );
}


export default CCviewFReqlist;






/*
////////////////////////////////////////////// working -   on clikc next page - /CCviewFReqSingle
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './CCviewFReqlist.css';


function CCviewFReqlist() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = Cookies.get('accessToken');
  const adminId = localStorage.getItem('userId');


  useEffect(() => {
    fetchRequests();
  }, []);


  const fetchRequests = () => {
    axios
      .get(`/api/roleccqc/allocated-farmer-requests/${adminId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };


  return (
    <div>
      <h1>Farmer-to-Call-Center Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="centered-table-container">
          <table className="table-container">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Crop ID</th>
                <th>Farmer ID</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.requestId}>
                  <td>
                    <Link to={`/CCviewFReqSingle/${adminId}/${request.requestId}`}>
                      {request.requestId}
                    </Link>
                  </td>
                  <td>{request.cropId}</td>
                  <td>{request.farmerId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


export default CCviewFReqlist;




///////////////////////////////////////////////// working -  only this page


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './CCviewFReqlist.css';


function CCviewFReqlist() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  const accessToken = Cookies.get('accessToken');
  const adminId = localStorage.getItem('userId');


  useEffect(() => {
    fetchRequests();
  }, []);
 // empty array excuse


  const fetchRequests = () => {
    axios
      .get(`/api/roleccqc/allocated-farmer-requests/${adminId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
         
        },
      })
      .then((response) => {
        setRequests(response.data);
        console.log("three");
        setLoading(false);


      })
      .catch((error) => {
        setError(error); // Set error state
        //     console.error('Error fetching requests:', error);
        console.log("four");
        setLoading(false);
      });
  };


  // ...


  return (
    <div>
      <h1>Farmer-to-Call-Center Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="centered-table-container">
          <table className="table-container">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Crop ID</th>
                <th>Farmer ID</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.requestId}>
                  <td>{request.requestId}</td>
                  <td>{request.cropId}</td>
                  <td>{request.farmerId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
 
}


export default CCviewFReqlist;


*/



