import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './QCViewApprovalForm.css';
// import {AnimateGroup} from 'react-animate-mount';
import { motion } from "framer-motion";
// not display data
import logo from '../src/logo3.png';
import animationJSON from "./success2.json";


// css clsnm


function QCViewApprovalForm() {




 const { requestId } = useParams();
  //console.log('Received requestId:', requestId);


  const [request, setRequest] = useState(null);
  const [requests, setRequests] = useState([]); // useState(null);


  const [approvalForm, setApprovalForm] = useState(null);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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
    .get(`/api/QCAdmin/QCViewApprovalForm/${requestId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      //const approvalFormData = response.data.approvalForm ?? {}; // Use an empty object if approvalForm is undefined


                                         // setApprovalForm(approvalFormData);
      //setApprovalForm(response.data.approvalFormData);
      //setApprovalForm(response.data.approvalForm || []);


      //console.log("form1", approvalFormData);
      //console.log("form2" ,response.data.approvalForm);


      setRequests(response.data);
      setLoading(false);
      console.log(response.data);


      //const  requestId = response.data.reqForQCCC;
      //console.log(requestId);


      /*
      const firstRequest = response.data[0];
      if (firstRequest) {
        const requestIdd = firstRequest.reqForQCCC;
        console.log(requestIdd);
      }
      */


    })
    .catch((error) => {
      setError(error);
      setLoading(false);
    });
};
 
 


  const handleBack = () => {
    navigate('/QCWorkResponse')
 
  };


 


  const handleNext = (requestId) => {
    console.log("handleNext" , requestId);
    navigate(`/QCViewApprovalFormNext/${requestId}`);
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
        <header className="qctop-navigation">
          <h1 className="welcome-text">Welcome to Quality Check Employee Portal</h1>
          <button className="qcprofile-button">Profile</button>
        </header>
        <div className='qcdivcontainer'>
          <div className="qccontainer">






            <div className="qcaftitle">Approval Form</div>
            <br></br>
            <br></br>


            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="error">Error: {error.message}</p>
            ) : (
              requests.map((request) => (
                <div key={request.reqForQCCC} className="qcreqdiv">
                  <div className="qcview-detail">
                    <strong> Request ID:</strong>
                    <div className="qcview-detail-value">{request.reqForQCCC.slice(-6)}</div>
                  </div>
                  <div className="qcview-detail">
                    <strong>Farmer Name:</strong>
                    <div className="qcview-detail-value">{request.farmerName}</div>
                  </div>
                  {/* Add more details as needed */}




                  {/* <strong>Approval Forms:</strong> */}
                  <div className="qcview-detail">
                    {request.approvalForms.map((form) => (
                      <div key={form.id}>
                        <strong>Farm Location:</strong>
                        <div className="qcview-detail-value">{form.farmLocation}</div>
                      </div>
                    ))}
                  </div>


                  <div className="qcview-detail">
                    {request.approvalForms.map((form) => (
                      <div key={form.id}>
                        <strong>Farm Area:</strong>
                        <div className="qcview-detail-value">{form.farmArea}</div>
                       
                      </div>
                    ))}
                  </div>


          {/*  Check farmer's uploaded data with actual crops */}


<div className="qcview-detail">
  {request.approvalForms.map((form) => (
    <div key={form.id}>
      <strong>cropTypes:</strong>
      <div className="qcview-detail-value">
        {form.cropTypes ? "Matched" : "Unmatched"}
      </div>
    </div>
  ))}
</div>


<div className="qcview-detail">
  {request.approvalForms.map((form) => (
    <div key={form.id}>
      <strong>cropSubtype:</strong>
      <div className="qcview-detail-value">
        {form.cropSubtype ? "Matched" : "Unmatched"}
      </div>
    </div>
  ))}
</div>




<div className="qcview-detail">
  {request.approvalForms.map((form) => (
    <div key={form.id}>
      <strong>quantity :</strong>
      <div className="qcview-detail-value">
        {form.quantityAvailable ? "Available" : " Not Available"}
      </div>
    </div>
  ))}
</div>


<div className="qcview-detail">
  {request.approvalForms.map((form) => (
    <div key={form.id}>
      <strong>organic Or Inorganic:</strong>
      <div className="qcview-detail-value">
        {form.organicOrInorganic ? "organic" : "Inorganic"}
      </div>
    </div>
  ))}
</div>


              {/*   high mid low  */}


              <div className="qcview-detail">
  {request.approvalForms.map((form) => (
    <div key={form.id}>
      <strong>Grain Size and Shape:</strong>
      <div className="qcview-detail-value">{form.grainSize}</div>
    </div>
  ))}
</div>


<div className="qcview-detail">
  {request.approvalForms.map((form) => (
    <div key={form.id}>
      <strong>Discolored Grains :</strong>
      <div className="qcview-detail-value">{form.presenceOfDiscoloredGrains}</div>
    </div>
  ))}
</div>




<div className="qcview-detail">
  {request.approvalForms.map((form) => (
    <div key={form.id}>
      <strong>Broken Grains :</strong>
      <div className="qcview-detail-value">{form.brokenGrains}</div>
    </div>
  ))}
</div>


<div className="qcview-detail">
  {request.approvalForms.map((form) => (
    <div key={form.id}>
      <strong>Weeviled Grains :</strong>
      <div className="qcview-detail-value">{form.weeviledGrains}</div>
    </div>
  ))}
</div>


<div className="qcview-detail">
  {request.approvalForms.map((form) => (
    <div key={form.id}>
      <strong>Moisture Content :</strong>
      <div className="qcview-detail-value">{form.moistureContent}</div>
    </div>
  ))}
</div>


<div className="qcview-detail">
  {request.approvalForms.map((form) => (
    <div key={form.id}>
      <strong>Aroma :</strong>
      <div className="qcview-detail-value">{form.aroma}</div>
    </div>
  ))}
</div>


<div className="qcview-detail">
  {request.approvalForms.map((form) => (
    <div key={form.id}>
      <strong>Expected Texture :</strong>
      <div className="qcview-detail-value">{form.expectedTexture}</div>
    </div>
  ))}
</div>


<div className="qcview-detail">
  {request.approvalForms.map((form) => (
    <div key={form.id}>
      <strong>Crop Condition :</strong>
      <div className="qcview-detail-value">{form.cropCondition}</div>
    </div>
  ))}
</div>


{/* safty appliance */}


<div className="qcview-detail">
  {request.approvalForms.map((form) => (
    <div key={form.id}>
      <strong> Safety Regulations:</strong>
      <div className="qcview-detail-value">
        {form.complianceWithSafetyRegulations ? "Followed" : "Not Followed"}
      </div>
    </div>
  ))}
</div>


<div className="qcview-detail">
  {request.approvalForms.map((form) => (
    <div key={form.id}>
      <strong>Artificial Ripening : </strong>
      <div className="qcview-detail-value">
        {form.artificialRipening ? "Present" : "Absent"}
      </div>
    </div>
  ))}
</div>


            {/* dates */}


                  <div className="qcview-detail">
                    <strong>QC Assigned Date:</strong>
                    <div className="qcview-detail-value">
                      {request.qcAssignedDate
                        ? new Date(request.qcAssignedDate).toLocaleDateString()
                        : 'N/A'}
                    </div>
                  </div>
                 
                  <div className="qcview-detail">
                    <strong>QC Inspection Dates:</strong>
                    {request.approvalForms.map((form) => (
                      <div key={form.id}>
                        <div className="qcview-detail-value">
                          {new Date(form.dateOfInspection).toLocaleDateString()}
                        </div>
                      </div>


                    ))}
                  </div>


          {/*  imges */}


{/* Give your feedback */}
                  <div className="qcview-detail">
                    {request.approvalForms.map((form) => (
                      <div key={form.id}>
                        <strong>rejection Reason:</strong>
                        <div className="qcview-detail-value">{form.rejectionReason}</div>
                      </div>
                    ))}
                  </div>


                  <div className="qcview-detail">
                    {request.approvalForms.map((form) => (
                      <div key={form.id}>
                        <strong>recommended Actions:</strong>
                        <div className="qcview-detail-value">{form.recommendedActions}</div>
                      </div>
                    ))}
                  </div>


          {/*                         Notes And Comments                       */}        


          {/*Approval Status: */}


                  <div className="qcview-detail">
                    <strong>Approval Status:</strong>
                    <div className="qcview-detail-value">
                      {request.approvalForms.every((form) => form.approvalStatus)
                        ? 'Approved'
                        : 'Rejected'}
                    </div>
                  </div>


                  <div className="qcview-detail">
                    <strong>View Images & Documents:</strong>
                    <div className="qcview-detail-value">
                  <button
         onClick={() => {
         console.log(request.reqForQCCC);
          //console.log(request.data.reqForQCCC); // Debugging: Check if request.reqForQCCC is defined and has a value
         handleNext(request.reqForQCCC);
         //handleNext(request.data.reqForQCCC);
          }}
         className="qcnext-button"
         >
         View
                  </button>
                  </div>
                  </div>


                </div>
              ))
            )}




            <button onClick={handleBack} className="qcback-button">
              Back
            </button>


            {isVisible && (
              <motion.div
                initial={initialVariants}
                animate={animateVariants}
                style={{
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
                }}
                className="pop-up-screen"
              >
                <motion.lottie src={animationJSON} loop autoplay />
                <h1>Request Approved Successfully</h1>
                <button onClick={() => setIsVisible(false)}>Close</button>
              </motion.div>


            )}




          </div>
        </div>
      </div>
    </div>
  );
              }  
export default QCViewApprovalForm;
