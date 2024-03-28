import React, { useState, useEffect  } from 'react';
import './QCDashboard.css';
import './QCWorkResponse.css';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import logo from '../src/logo3.png';


function QCWorkResponse(){
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const accessToken = Cookies.get('accessToken');
    const navigate = useNavigate();

   
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchResults, setSearchResults] = useState([]);
   
    const [keyword, setKeyword] = useState('');
    const userId = localStorage.getItem('userId');


    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Replace with your key
       
        axios
          .get(`/api/QCAdmin/qc-work-responses/${userId}`, {         // this user is qc
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            setRequests(response.data);
            setLoading(false);
            console.log(response.data);
            //const requestId = response.data.reqForQCCC;
           // console.log(requestId);
           const firstRequest = response.data[0];
           if (firstRequest) {
             const requestId = firstRequest.reqForQCCC;
             console.log(requestId);
           }

          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          });
      }, []); // The empty dependency array ensures this effect runs once on component mount.
     



      const handleSearch = () => {
        const userId = localStorage.getItem('userId');
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


     //api to sort by QCAssigned date,
  const handleSort = (order) => {
    //const userId = localStorage.getItem('userId');
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";


    setSortOrder(newSortOrder);


    // setSortOrder(order);
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


return(
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


      <div className='allocfarmerrequestdivcontainer'>
     <div className='allocfarmerrequestcontainer'>
    <h2 className='allocfarmerrequesth2'>Quality Checked Requests</h2>
   



    <div className="h1tagandinputbuttonQC">
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
                <div className="sort-container">
    <button className="button-barccviewqcfreeloc sort-button">Sort</button>
    <div className="dropdown">
     
      <div className="dropdown-content">
        <button onClick={() => handleSort('asc', 'qcAssignedDate')}>Ascending</button>
        <button onClick={() => handleSort('desc', 'qcAssignedDate')}>Descending</button>
      </div>
    </div>
  </div>
                </div>
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>Error: {error.message}</p>
    ) : (
      <table className="request-table">
        <thead className='requesttablethead'>
          <tr>
            <th>Request ID</th>
            <th>Farmer Name</th>


           <th>Crop Name</th>
           
           
           <th
                      onClick={() => handleSort("qcAssignedDate")}
                      data-sortable
                      data-order={sortOrder}
                    >
                      QC Assigned Date
                    </th>

            <th>Quality Check Status</th>
            <th> QC Approval Date</th>
            <th>Actions</th>
           
          </tr>
        </thead>
        <tbody>
        {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <tr key={result.reqForQCCC}>
                        <td>{result.reqForQCCC.slice(-6)}</td>
                        <td>{result.farmerName}</td>
                        <td>{result.cropName}</td>
                        {/* <td>
                          {result.approvalForms.map((form) => (
                            <div key={form.id}>{form.farmLocation}</div>
                          ))}
                        </td> */}
                        <td>
                          {result.qcAssignedDate
                            ? new Date(result.qcAssignedDate).toLocaleDateString()
                            : 'N/A'}
                        </td>
                        <td>
                          {result.approvalForms.every((form) => form.approvalStatus)
                            ? 'Approved'
                            : 'Rejected'}
                        </td>
                        <td>
                          {result.approvalForms.map((form) => (
                            <div key={form.id}>
                              {new Date(form.dateOfInspection).toLocaleDateString()}
                            </div>
                          ))}
                        </td>
                        <td>
                <Link to={`/QCViewApprovalForm/${result.reqForQCCC}`}><button className='qcdetailsviewbutton'>View</button></Link>
              </td>


                      </tr>
                    ))
                  ) : (
                    requests.map((request) => (
                      <tr key={request.reqForQCCC}>
                        <td>{request.reqForQCCC.slice(-6)}</td>
                        <td>{request.farmerName}</td>
                        <td>{request.cropName}</td>
                       {/*
                        <td> 
                          {request.approvalForms.map((form) => (
                            <div key={form.id}>{form.farmLocation}</div>
                          ))}
                        </td>
                         */}
                        <td>
                          {request.qcAssignedDate
                            ? new Date(request.qcAssignedDate).toLocaleDateString()
                            : 'N/A'}
                        </td>
                        <td>
                          {request.approvalForms.every((form) => form.approvalStatus)
                            ? 'Approved'
                            : 'Rejected'}
                        </td>
                        <td>
                          {request.approvalForms.map((form) => (
                            <div key={form.id}>
                              {new Date(form.dateOfInspection).toLocaleDateString()}
                            </div>
                          ))}
                        </td>
                        <td>
                <Link to={`/QCViewApprovalForm/${request.reqForQCCC}`}><button className='qcdetailsviewbutton' >View</button></Link>
              </td>
                      </tr>
                    ))
                  )}
        </tbody>
      </table>
    )}
  </div>
     </div>
   
      </div>
      </div>




);
}



export default QCWorkResponse;



/*  

{loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>Error: {error.message}</p>
    ) : (
      <table className="request-table">
        <thead className='requesttablethead'>
          <tr>
            <th>Request ID</th>
            <th>Farmer Name</th>


           <th>Farm Location</th>
           
         
            <th>QC Assigned Date </th>
            <th>Quality Check Status</th>
            <th> QC Approval Date</th>
            <th>Actions</th>
           
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.reqForQCCC}>
             <td>{request.reqForQCCC.slice(-6)}</td>
              <td>{request.farmerName}</td>
        
         <td>
         {request.approvalForms.map((form) => (
          <div key={form.id}>
         
             {form.farmLocation}
          </div>
        ))}
         </td>
         <td>
         {request.qcAssignedDate
    ? new Date(request.qcAssignedDate).toLocaleDateString()
    : 'N/A'}
    </td>
         <td>
       
         {request.approvalForms.every((form) => form.approvalStatus) ? 'Approved' : 'Rejected'}
         </td>
         <td>
       
        {request.approvalForms.map((form) => (
          <div key={form.id}>
         
             {new Date(form.dateOfInspection).toLocaleDateString()}
          </div>
        ))}
      </td>
      <td>
                <Link to={`/QCViewApprovalForm/${request.reqForQCCC}`}><button className='qcdetailsviewbutton' >View</button></Link>
              </td>
              
           
              </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
     </div>
   
      </div>
      </div>




);
}

*/

/*
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
                <div className="sort-container">
    <button className="button-barccviewqcfreeloc sort-button">Sort</button>
    <div className="dropdown">
     
      <div className="dropdown-content">
        <button onClick={() => handleSort('asc', 'qcAssignedDate')}>Ascending</button>
        <button onClick={() => handleSort('desc', 'qcAssignedDate')}>Descending</button>
      </div>
    </div>
  </div>
                </div>
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>Error: {error.message}</p>
    ) : (
      <table className="request-table">
        <thead className='requesttablethead'>
          <tr>
            <th>Request ID</th>
            <th>Farmer Name</th>


           <th>Farm Location</th>
           
           
            <th>QC Assigned Date </th>
            <th>Quality Check Status</th>
            <th> QC Approval Date</th>
            <th>Actions</th>
           
          </tr>
        </thead>
        <tbody>
        {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <tr key={result.reqForQCCC}>
                        <td>{result.reqForQCCC.slice(-6)}</td>
                        <td>{result.farmerName}</td>
                        <td>
                          {result.approvalForms.map((form) => (
                            <div key={form.id}>{form.farmLocation}</div>
                          ))}
                        </td>
                        <td>
                          {result.qcAssignedDate
                            ? new Date(result.qcAssignedDate).toLocaleDateString()
                            : 'N/A'}
                        </td>
                        <td>
                          {result.approvalForms.every((form) => form.approvalStatus)
                            ? 'Approved'
                            : 'Rejected'}
                        </td>
                        <td>
                          {result.approvalForms.map((form) => (
                            <div key={form.id}>
                              {new Date(form.dateOfInspection).toLocaleDateString()}
                            </div>
                          ))}
                        </td>
                        <td>
                <Link to={`/QCViewApprovalForm/${requests.reqForQCCC}`}><button className='qcdetailsviewbutton'>View</button></Link>
              </td>


                      </tr>
                    ))
                  ) : (
                    requests.map((request) => (
                      <tr key={request.reqForQCCC}>
                        <td>{request.reqForQCCC.slice(-6)}</td>
                        <td>{request.farmerName}</td>
                        <td>
                          {request.approvalForms.map((form) => (
                            <div key={form.id}>{form.farmLocation}</div>
                          ))}
                        </td>
                        <td>
                          {request.qcAssignedDate
                            ? new Date(request.qcAssignedDate).toLocaleDateString()
                            : 'N/A'}
                        </td>
                        <td>
                          {request.approvalForms.every((form) => form.approvalStatus)
                            ? 'Approved'
                            : 'Rejected'}
                        </td>
                        <td>
                          {request.approvalForms.map((form) => (
                            <div key={form.id}>
                              {new Date(form.dateOfInspection).toLocaleDateString()}
                            </div>
                          ))}
                        </td>
                        <td>
                <Link to={`/QCViewApprovalForm/${requests.reqForQCCC}`}><button className='qcdetailsviewbutton' >View</button></Link>
              </td>
                      </tr>
                    ))
                  )}
        </tbody>
      </table>
    )}
  </div>
     </div>
   
      </div>
      </div>




);
}
*/