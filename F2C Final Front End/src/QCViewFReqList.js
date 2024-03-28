// QCViewFReqList.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { faUserCircle, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NotificationModal from './NotificationModal';
import './QCViewFReqList.css';
import logo from '../src/logo3.png';

function QCViewFReqList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = Cookies.get('accessToken');
  const [rejectDisabled, setRejectDisabled] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // Add these state variables for counts
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  useEffect(() => {

    fetchRequests();
    fetchNotifications();
  }, []); // The empty dependency array ensures this effect runs once on component mount.

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`/api/QCAdmin/view-all-requests/${userId}`, {
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
      .get(`/api/QCAdmin/view-all-requests/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setRequests(response.data);

        // Update counts when data is fetched
        updateCounts(response.data);

        setLoading(false);
        console.log('data :' , response.data);
        const  requestId = response.data.reqForQCCC;
       // const  cropName = response.data.cropName;
      // console.log("cropnm" , cropName);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  // Function to update counts based on the requests data
  const updateCounts = (data) => {
    let pending = 0;
    let approved = 0;
    let rejected = 0;

    data.forEach((request) => {
      switch (request.handledQC) {
        case 'processing':
          pending++;
          break;
        case 'Approved':
          approved++;
          break;
        case 'Rejected':
          rejected++;
          break;
        default:
          break;
      }
    });

    setPendingCount(pending);
    setApprovedCount(approved);
    setRejectedCount(rejected);
  };

  const handleApprovalForm = (requestId ) => {
    const { cropName, cropSubType, quantityAvailable, organicInOrganic } = requests.find(
      (request) => request.reqForQCCC === requestId
    );
   // navigate(`/QCApprovalForm/${requestId}`); // Navigate to the 'QCApprovalForm' page
   
   navigate(`/QCApprovalForm/${requestId}/${cropName}/${cropSubType}/${quantityAvailable}/${organicInOrganic}`);
  }

  const handleSearch = () => {
    axios
      .get(`/api/QCAdmin/search/${keyword}/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleSort = (order) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
  
  
    setSortOrder(newSortOrder);
  
  
    // setSortBy(field);
    // Make the API call with the selected sort order and field
    axios
      .get(`/api/QCAdmin/${userId}/sort?sortOrder=${newSortOrder}`, {
        //&sortBy=${field}
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setSearchResults(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="qc-dashboard">
      <nav className="qcleft-navigation">
        <img className="logo" src={logo} alt="logo" />
        <ul>
          <Link to="/QCDashboard" state={{ pendingCount, approvedCount, rejectedCount }}>
            <li>
              <button>Home</button>
            </li>
          </Link>
          <Link to="/QCViewFReqList">
            <li>
              <button>Verification Request</button>
            </li>
          </Link>
          <Link to="/QCWorkResponse">
            <li>
              <button>Handled Request</button>
            </li>
          </Link>
          <li>
            <button onClick={() => setShowModal(true)}>Notifications</button>
          </li>
          <li>
            <button>Settings</button>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
      <div className="content">
        <header className="qctop-navigation">
          <h1 className="welcome-text">Welcome to Quality Check Employee Portal</h1>
          <div className="notification-icon" onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faBell} />
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </div>
          <button className="qcprofile-button">Profile</button>
        </header>
        <div className="allocfarmerrequestdivcontainer">
          <div className="allocfarmerrequestcontainer">
            <h2 className="allocfarmerrequesth2">Allocated Farmer Requests</h2>
            <div>
              <div className="h1tagandinputbutton">
                <input
                  className="search-barqcviewqcfreeloc"
                  type="text"
                  placeholder="Enter Crop Name"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button className="button-barccviewqcfreeloc" onClick={handleSearch}>
                  Search
                </button>

                 {/* 
                <div className="sort-container">
                  <button className="button-barccviewqcfreeloc sort-button">Sort</button>
                  <div className="dropdown">
                    <div className="dropdown-content">
                      <button onClick={() => handleSort('asc', 'qcAssignedDate')}>Ascending</button>
                      <button onClick={() => handleSort('desc', 'qcAssignedDate')}>Descending</button>
                    </div>
                  </div>
                </div>
                */}

              </div>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (
              <table className="request-table">
                <thead className="requesttablethead">
                  <tr>
                    <th>Request ID</th>
                    <th>Farmer Name</th>
                    <th>Crop Name</th>
                   {/* <th>CC Employee Name</th> */}
                    <th
                      onClick={() => handleSort("qcAssignedDate")}
                      data-sortable
                      data-order={sortOrder}
                    >
                      QC Assigned Date
                    </th>
                    <th>Quality Check Status</th>
                    <th>Actions</th>
                    <th>Approve</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.length > 0
                    ? searchResults.map((result) => (
                        <tr key={result.reqForQCCC}>
                          <td>{result.reqForQCCC.slice(-6)}</td>
                          <td>{result.farmerName}</td>
                          <td>{result.cropName}</td>
                         {/* <td>{result.ccemployeeName}</td> */}
                         <td>
                          {result.qcAssignedDate
                            ? new Date(result.qcAssignedDate).toLocaleDateString()
                            : 'N/A'}
                        </td>

                          <td>{result.handledQC}</td>
                          <td>
                            <Link to={`/QCViewFReqSingle/${result.reqForQCCC}`}>
                              <button className="qcdetailsviewbutton">View</button>
                            </Link>
                          </td>
                          <td>
                            <button
                              disabled={
                                rejectDisabled || result.handledQC === 'Approved' || result.handledQC === 'Rejected'
                              }
                              style={{
                                cursor:
                                  rejectDisabled || result.handledQC === 'Approved' || result.handledQC === 'Rejected'
                                    ? 'not-allowed'
                                    : 'pointer',
                                backgroundColor:
                                  rejectDisabled || result.handledQC === 'Approved' || result.handledQC === 'Rejected'
                                    ? '#9fd2ff'
                                    : '#1a8cf0',
                                color: 'white',
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: '600',
                              }}
                              onClick={() => handleApprovalForm(result.reqForQCCC)}
                              className="qcdetailsviewbutton"
                            >
                              Approve
                            </button>
                          </td>
                        </tr>
                      ))
                    : requests.map((request) => (
                        <tr key={request.reqForQCCC}>
                          <td>{request.reqForQCCC.slice(-6)}</td>
                          <td>{request.farmerName}</td>
                          <td>{request.cropName}</td>
                         {/* <td>{request.ccemployeeName}</td> */}
                         <td>
                          {request.qcAssignedDate
                            ? new Date(request.qcAssignedDate).toLocaleDateString()
                            : 'N/A'}
                        </td> 
                          <td>{request.handledQC}</td>
                          <td>
                            <Link to={`/QCViewFReqSingle/${request.reqForQCCC}`}>
                              <button className="qcdetailsviewbutton">View</button>
                            </Link>
                          </td>
                          <td>
                            <button
                              disabled={
                                rejectDisabled || request.handledQC === 'Approved' || request.handledQC === 'Rejected'
                              }
                              style={{
                                cursor:
                                  rejectDisabled || request.handledQC === 'Approved' || request.handledQC === 'Rejected'
                                    ? 'not-allowed'
                                    : 'pointer',
                                backgroundColor:
                                  rejectDisabled || request.handledQC === 'Approved' || request.handledQC === 'Rejected'
                                    ? '#9fd2ff'
                                    : '#1a8cf0',
                                color: 'white',
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: '600',
                              }}
                              onClick={() => handleApprovalForm(request.reqForQCCC)}
                              className="qcdetailsviewbutton"
                            >
                              Approve
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="notification-container">
          <h3>Notifications</h3>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification.message}</li>
            ))}
          </ul>
        </div>

        {/* Display the counts */}
        <div className="request-counts">
          <p>Pending Requests: {pendingCount}</p>
          <p>Approved Requests: {approvedCount}</p>
          <p>Rejected Requests: {rejectedCount}</p>
        </div>
      </div>
      {showModal && (
        <NotificationModal
          notifications={notifications}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default QCViewFReqList;
