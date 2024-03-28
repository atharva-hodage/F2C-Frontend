import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'; 
//npm install --save sweetalert2


// import './App.css'

import './GetCropDetails.css'
import FarmerSideNavigationbar from './FarmerSideNavigationbar';
import FarmerHeaderBar from './FarmerHeaderBar';

function FarmerReqList() {
    
    const [cropDetails, setCropDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const accessToken = Cookies.get('accessToken');
    const farmerId = localStorage.getItem("userId");
 
    const { requestId } = useParams();
    const [requests, setRequests] = useState([]); // useState(null);

    useEffect(() => {
     
      fetchCropDetails();
    }, []);
  
  const fetchCropDetails=() =>{
   
      console.log(farmerId);
      axios.get(`/api/rolef/getApprovedOrRejectedRequests/${farmerId}`, 
          { 
              headers :{
                  Authorization: `Bearer ${accessToken}`,
                } 
          } 
          )
          .then((response) => {
          setCropDetails(response.data);
          console.log(response.data);
         //const approvalStatus = response.data.approvalStatus;
         //console.log(approvalStatus);

         
          
          setLoading(false);
          const firstRequest = response.data[0];
           if (firstRequest) {
             const requestId = firstRequest.requestId;
             console.log(requestId);
           }

        })
        .catch((error) => {
          console.error('Error fetching crop details:', error);
          setLoading(false);
        });
  }
  

  

  //fetch(`http://localhost:8081/api/rolef/FViewApprovalForm/${requestId}`, {
    const handleViewButtonClick = (requestId) => {
    
    };

    /*
    const handleApprovalStatusHover = (handledQC) => {
        if (handledQC && handledQC.toLowerCase() === 'rejected') {
          Swal.fire('Crop Rejected!', 'Your crop has been rejected.', 'error');
        }
      };
*/

const fetchSingleRequest = (requestId, accessToken) => {
    setLoading(true);
    setError(null);
  
    axios
    .get(`/api/rolef/FViewApprovalForm/${requestId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
     

      setRequests(response.data);
      setLoading(false);
      
      console.log('Request Data:', response.data);

      const firstRequest = response.data[0];
if (firstRequest && firstRequest.approvalForms && firstRequest.approvalForms.length > 0) {
  const rejectionReason = firstRequest.approvalForms[0].rejectionReason;
  console.log('Rejection Reasonss:', rejectionReason);
 
  if (firstRequest.handledQC && firstRequest.handledQC.toLowerCase() === 'rejected') {
    Swal.fire('Your crop has been rejected!', ` Reason: ${rejectionReason}`, 'error');
  } else if (firstRequest.handledQC && firstRequest.handledQC.toLowerCase() === 'approved') {
    Swal.fire('Your crop has been approved!',` Reason: ${rejectionReason}`, 'success');
  }
}


        /*
      console.log('Rejection Reason1:', response.data.rejectionReason);
       if (response.data && response.data.rejectionReason) {
        console.log('Rejection Reason:', response.data.rejectionReason);
      }
      
      console.log('Rejection Reason2:', response.data.approvalForms[0]?.rejectionReason);
      
      response.data.approvalForms.forEach((form, index) => {
        console.log(`Rejection Reason3 ${index + 1}:`, form.rejectionReason);
      });
      */


    })
    .catch((error) => {
      setError(error);
      setLoading(false);
    });
};  

/*
const handleApprovalStatusHover = (handledQC, requestId) => {
    if (handledQC) {
      if (handledQC.toLowerCase() === 'rejected') {
        Swal.fire('Crop Rejected!', 'Your crop has been rejected.', 'error');
      } else if (handledQC.toLowerCase() === 'approved') {
        Swal.fire('Crop Approved!', 'Your crop has been approved.', 'success');
        fetchSingleRequest(requestId, accessToken);
      }
    }
  };

  const handleApprovalStatusHover = (handledQC, requestId) => {
    if (handledQC) {
      if (handledQC.toLowerCase() === 'rejected') {
        // For rejected case, directly call fetchSingleRequest without Swal.fire
        Swal.fire('Crop Rejected!', 'Your crop has been rejected.', 'error').then(() => {
            fetchSingleRequest(requestId, accessToken);
          });
      } else if (handledQC.toLowerCase() === 'approved') {
        // For approved case, show Swal.fire and then call fetchSingleRequest
        Swal.fire('Crop Approved!', 'Your crop has been approved.', 'success').then(() => {
          fetchSingleRequest(requestId, accessToken);
        });
      }
    }
  };
  */

  const handleApprovalStatusHover = (handledQC, requestId) => {
    if (handledQC) {
      if (handledQC.toLowerCase() === 'rejected') {
        fetchSingleRequest(requestId, accessToken);
      } else if (handledQC.toLowerCase() === 'approved') {
        fetchSingleRequest(requestId, accessToken);
      }
    }
  };

  return (
    <div className="farmer-dashboard">
        <FarmerSideNavigationbar />
        <div className="content">
            <FarmerHeaderBar />

            <div className='getcropdetailstablecontainer'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className='getcropdetailstable'>
                        <thead className='getcropdetailstablehead'>
                            <tr>
                                <th>Crop Name</th>
                                <th>Crop Subtype</th>
                                <th>Crop Quantity</th>

                               
                                <th>Approval Status</th>
                               
          {/* 
               <th>
              Approval Status
             
              <span onMouseOver={() => handleApprovalStatusHover(cropDetails[0]?.handledQC)}>
                <span role="img" aria-label="Info" style={{ marginLeft: '5px', cursor: 'help' }}>
                  ℹ️
                </span>
              </span>
            </th>
        */}
                                <th>View Details</th>
                                
                            </tr>
                        </thead>
                        <tbody className='getcropdetailstbody'>
                            {cropDetails.map((crop, index) => (
                                <tr key={index}>
                                    <td>{crop.cropName}</td>
                                    <td>{crop.cropSubType}</td>
                                    <td>{crop.quantityAvailable}</td>
                                    {/*  <td>{crop.handledQC}</td>  */}

                                    <td
                onMouseOver={() => handleApprovalStatusHover(crop.handledQC, crop.requestId)}
                style={{ cursor: 'help' }}
              >
                {crop.handledQC}
              </td>

             
                                    
                                    {/*
                                    <td>
                                 <button onClick={() => handleViewButtonClick(crop.reqForQCCC)} >
                                            View
                                 </button>
                                    </td>
                                     */}

                                    <td>
                <Link to={`/FViewApprovalForm/${crop.requestId}`}><button className='qcdetailsviewbutton' >View</button></Link>
              </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    </div>
);
}
  
  export default FarmerReqList;