


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'; 

// import './App.css'
import { Link } from 'react-router-dom';
import './GetCropDetails.css'
import FarmerSideNavigationbar from './FarmerSideNavigationbar';
import FarmerHeaderBar from './FarmerHeaderBar';


function CropDetails() {
  const [cropDetails, setCropDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = Cookies.get('accessToken');
  const farmerId = localStorage.getItem("userId");
 const [verifyButtonClicked,setVerifyButtonClicked] = useState({});
 
  useEffect(() => {
   
    fetchCropDetails();
  }, []);

const fetchCropDetails=() =>{
 
    console.log(farmerId);
    axios.get(`/api/rolef/getCropDetailsFarmer/${farmerId}`, 
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
      })
      .catch((error) => {
        console.error('Error fetching crop details:', error);
        setLoading(false);
      });
}

const fetchreqid = (cropId) => {
  console.log(cropId);
  const crop = cropDetails.find((crop) => crop.cropId === cropId);
  if(crop.approvalStatus === false){
    setVerifyButtonClicked({...verifyButtonClicked,[crop.cropId]:true});
  }

  axios
    .post(`/api/rolef/setEmptyRequestField/${farmerId}/${cropId}`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      console.log('reqid = ', response.data);
      const updatedCropDetails = cropDetails.map((crop) => {
        if (crop.cropId === cropId) {
          return {
            ...crop,
            approvalStatus: false, 
          };
        }
        return crop;
      });

      setCropDetails(updatedCropDetails);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your Request for Crop Verification has sent Successfully.',
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      
    });
};

const handleDeleteClick = (cropId) => {
  Swal.fire({
      title: 'Are you sure?',
      text: "This Crop will be removed from your Crop List Permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/rolef/deleteCropDetails/${farmerId}/${cropId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            fetchCropDetails();
            Swal.fire(
              'Deleted!',
              'Your Crop has been deleted.',
              'success'
            );
          })
          .catch((error) => {
            console.error('Error deleting crop:', error);
            Swal.fire(
              'Error',
              'An error occurred while deleting the crop.',
              'error'
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Crop has not been Deleted :)',
          'error'
        );
      }
    });
};

const handlePublishClick = (cropId) => {
  Swal.fire({
      title: 'Publish Crop?',
      text: 'Are you sure you want to publish this crop?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, publish it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`/api/rolef/publish/${farmerId}/${cropId}`, null, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            fetchCropDetails();
            Swal.fire(
              'Published!',
              'Your crop has been published.',
              'success'
            );
          })
          .catch((error) => {
            console.error('Error publishing crop:', error);
            Swal.fire(
              'Error',
              'An error occurred while publishing the crop.',
              'error'
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your crop is not published.',
          'error'
        );
      }
    });
};

  const handleVerifyButtonClick = (event) =>{
    const button = event.target;
    const cropId = button.dataset.cropId;

    button.disabled = true;

    fetchreqid(cropId);
  }
  return (

    <div className="farmer-dashboard">
      
     <FarmerSideNavigationbar/>
      <div className="content">
       
     <FarmerHeaderBar/>
        
    <div className='getcropdetailstablecontainer'> 
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className='getcropdetailstable'>
          <thead className='getcropdetailstablehead' >
            <tr>
              <th >  Crop Name  </th>
             
              <th>  Crop Subtype  </th>
              <th>  Retail Price (Rs./kg) </th>
              <th>  Wholesale Price (Rs./kg) </th>
              <th>  Verify </th>
              <th>  Approval Status  </th>
              <th>  Published  </th> 
              <th>  Edit </th>
              <th>  Delete </th>
            
            </tr>
          </thead>
          <tbody className='getcropdetailstbody' >
            {cropDetails.map((crop, index) => (
              <tr key={index}>
                <td>  {crop.cropName}  </td>
               
                <td>  { crop.cropSubType }  </td>
                <td>  { crop.cropRetailPrice }  </td>
                <td>  { crop.cropWholesalePrice }  </td>

                    
                    {/* keep status send request then pending 
                         then approved  rejected
                    once verify that btn should disbale - not working
                    if approve then that btn stay disable - working
                    if reject then btn should enable or disbale - ??????  sir 
                    */}

<td> 
                    <button
                        className={`verify ${crop.approvalStatus === false ? '':'disabled' }`}
                        data-crop-id={crop.cropId}
                        onClick={handleVerifyButtonClick}   
                        disabled={crop.approvalStatus !== false || verifyButtonClicked[crop.cropid]} 
                      >
                    Verify
                   </button>  

                  </td>

                    <td>   { crop.approvalStatus ? 'Approved' : 'Pending' }  </td> 
                {/*   <td>{ crop.approvalStatus==false ? 'Pending' : crop.approvalStatus ? 'Approved' : 'Rejected'}</td> */} 
                   {/* Pending      Rejected   */}

             {/* 
                         className={`verify ${crop.approvalStatus === undefined ? '' : 'disabled'}`}
                        onClick={() => handleVerifyButtonClick(crop.cropId)} 
                        onClick={handleVerifyButtonClick}   
                      */}       

     {/*
      <td>{crop.approvalStatus == undefined ? 'Pending' : crop.approvalStatus ? 'Approved' : 'Rejected'}</td>
      <td>  { crop.approvalStatus ? 'Approved' : 'Pending' }  </td>  
     */}
               {/* <td>  { crop.approvalStatus ? 'Approved' : 'Rejected' }  </td> */} 
               {/*<td>  { crop.published ? 'Published' : '' }  </td>*/}                       
               {/* 
                check  QCViewFReqList   for pending issue
               
                <td>
                  {console.log(crop.approvalStatus)} 
        {crop.approvalStatus === undefined && 'Pending'}
        {crop.approvalStatus === true && 'Approved'}
        {crop.approvalStatus === false && 'Rejected'}
      </td>
               
               
               
               */} 


                {/*          
               <td>
              {(() => {
                if (crop.approvalStatus === true) {
                  return 'Approved';
                } else if (crop.approvalStatus === false) {
                  return 'Rejected';
                } else {
                  return 'Pending';
                }
              })()}
            </td>
            */} 

              {/*  
               <td>
                            <button
                              disabled={
                                rejectDisabled || crop.approvalStatus === 'Approved' || crop.approvalStatus === 'Rejected'
                              }
                              style={{
                                cursor:
                                  rejectDisabled || crop.approvalStatus === 'Approved' || crop.approvalStatus === 'Rejected'
                                    ? 'not-allowed'
                                    : 'pointer',
                                backgroundColor:
                                  rejectDisabled || crop.approvalStatus === 'Approved' || crop.approvalStatus === 'Rejected'
                                    ? '#9fd2ff'
                                    : '#1a8cf0',
                                color: 'white',
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: '600',
                              }}
                              onClick={() => handleApprovalForm(crop.approvalStatus)}
                              className="qcdetailsviewbutton"
                            >
                                                                             verify
                            </button>
                          </td>
                */} 


               <td>
                 {/*
                  if approve then only publish btn should enable
                  if reject then publish btn should disable
                    */}
                  <button
                    onClick={() => handlePublishClick(crop.cropId)}
                    disabled={crop.approvalStatus && crop.published} // Disable the button if already published
                    style={{
                        backgroundColor: crop.published || !crop.approvalStatus? ' rgb(144, 207, 238) ' : 'rgb(10, 125, 240)', // Set the color based on the published status
                        color: 'white', // Text color
                        fontWeight: 'bold', // Bold text
                        cursor: crop.published || !crop.approvalStatus? 'not-allowed':'pointer',
                        
                        padding: '10px 20px', // Increase the padding to make the button bigger
                        fontSize: '16px', // Increase the font size
                        borderRadius: '5px', // Cursor style
                      }}
                  >
                    {crop.published ? 'Publish' : 'Publish'}
                  </button>
                </td>
                    <td>
                    <Link
  to={`/editCrop/${crop.cropId}`}
  style={{
    marginLeft: '10px',
    textDecoration: 'none',
  }}
>
  <button
    style={{
      backgroundColor: '#ffffff',
      color: '#646464',
      boxShadow:'0px 0px 5px rgba(0, 0, 0, 0.2)',
      fontWeight: 'bold',
      cursor: 'pointer',
      padding: '10px 20px',
      fontSize: '16px',
      borderRadius: '10px',
    }}
  >
    <FontAwesomeIcon icon={faEdit} />
    
  </button>
</Link>

                    </td>
                    <td>
                    <button
  onClick={() => handleDeleteClick(crop.cropId)}
  style={{
    backgroundColor: '#f23800',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '10px',
  }}
>
  <FontAwesomeIcon icon={faTrash} />
  
</button>
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

export default CropDetails;


// const handleDeleteClick = (cropId) => {
//   // Make a DELETE request to your API to delete the crop
//   axios
//     .delete(`/api/rolef/deleteCropDetails/${farmerId}/${cropId}`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     })
//     .then((response) => {
//       // Refresh the crop details after deletion
//       fetchCropDetails();
//     })
//     .catch((error) => {
//       console.error('Error deleting crop:', error);
//     });
// };





/* ///////////////////////////


Pranjali src -------
Pranjali Working Get Crop Details 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
//import './App.css';
import './GetCropDetails.css';
function CropDetails() {
  const [cropDetails, setCropDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = Cookies.get('accessToken');
  const farmerId = localStorage.getItem('userId');

  useEffect(() => {
    fetchCropDetails();
  }, );

  const fetchCropDetails = () => {
    axios
      .get(`/api/rolef/getCropDetailsFarmer/${farmerId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setCropDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching crop details:', error);
        setLoading(false);
      });
  };

  const fetchreqid = (cropId) => {
    axios
      .post(`/api/rolef/setEmptyFieldsRequest/${farmerId}/${cropId}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log('reqid = ', response.data);

        // Update the approvalStatus for the specific crop in the state
        const updatedCropDetails = cropDetails.map((crop) => {
          if (crop.cropId === cropId) {
            return {
              ...crop,
              approvalStatus: 'pending', // Change approval status to "pending"
            };
          }
          return crop;
        });

        setCropDetails(updatedCropDetails);
      })
      .catch((error) => {
        console.error('Error publishing crop:', error);
      });
  };

  const handlePublishClick = (cropId) => {
    axios
      .put(`/api/rolef/publish/${farmerId}/${cropId}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // Refresh the crop details after publishing
        fetchCropDetails();
      })
      .catch((error) => {
        console.error('Error publishing crop:', error);
      });
  };

  return (
    <div>
      <h2>Crop Details for Farmers</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-container">
          <table className='getcropdetailstable'  style={{ marginRight: '20px' }}>
            <thead>
              <tr>
                <th>Crop Name</th>
                <th>Crop Subtype</th>
                <th>Retail Price</th>
                <th>Wholesale Price</th>
                <th>Verify</th>
                <th>Approval Status</th>
                <th>Publishing</th>
              </tr>
            </thead>

            <tbody>
              {cropDetails.map((crop, index) => (
                <tr key={index}>
                  <td>{crop.cropName}</td>
                  <td>{crop.cropSubType}</td>
                  <td>{crop.cropRetailPrice}</td>
                  <td>{crop.cropWholesalePrice}</td>

                  <td>
                    
                    <button
                        className={`verify ${crop.approvalStatus === 'pending' ? 'disabled' : ''}`}
                        onClick={() => fetchreqid(crop.cropId)}
                        disabled={crop.approvalStatus === 'pending'} >
                    Verify
                   </button>

                  </td>

                  <td>{crop.approvalStatus}</td>

                  <td>
                    {/* <button
                      onClick={() => handlePublishClick(crop.cropId)}
                      disabled={crop.published}
                      style={{
                        backgroundColor: crop.published ? 'green' : 'red',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        padding: '10px 20px',
                        fontSize: '16px',
                        borderRadius: '5px',
                      }}
                    >
                     
                    <button
                      className={`publish ${crop.published ? 'published' : ''}`}
                      onClick={() => handlePublishClick(crop.cropId)}
                      disabled={crop.published} >
                        {crop.published ? 'Published' : 'Publish'}
                    </button>

                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CropDetails;
*/

