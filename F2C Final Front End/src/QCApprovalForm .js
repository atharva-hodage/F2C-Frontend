import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import logo from '../src/logo3.png';
import './QCApprovalForm.css';
import Swal from 'sweetalert2'; 

import FarmerSideNavigationbar from './FarmerSideNavigationbar';
import FarmerHeaderBar from './FarmerHeaderBar';

const QCApprovalForm = () => { 

  //const qcId = localStorage.getItem('userId');
  const { requestId } = useParams();
  //const { cropName} = useParams();
  const { cropName, cropSubType, quantityAvailable, organicInOrganic } = useParams();


  const navigate = useNavigate();
    const [formData, setFormData] = useState({
    
    
      farmLocation: '',
      farmArea: 0,
      cropTypes: false,
      cropSubtype: false,
      quantityAvailable: false,
      organicOrInorganic: false,
      files: [],
      docsFiles: [],
      grainSize: '',
      presenceOfDiscoloredGrains: '',
      moistureContent: '',
      aroma: '',
      brokenGrains: '',
      expectedTexture: '',
      cropCondition: '',
      weeviledGrains: '',
      complianceWithSafetyRegulations: false,
      artificialRipening: false,
      harvestingDate: null,
      dateOfInspection: null,
      //approvalStatus: false,
      rejectionReason: '',
      recommendedActions: '',
      notesAndComments: '',
    });


    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Get QC ID from localStorage
      const qcId = localStorage.getItem('userId');
       // Include the authorization header with your access token
       const accessToken = Cookies.get('accessToken'); // Assuming you are using Cookies to store the token

   const requestData = new FormData();
   requestData.append('farmLocation', formData.farmLocation);
   requestData.append('farmArea', formData.farmArea);
   requestData.append('cropTypes', formData.cropTypes);
   requestData.append('cropSubtype', formData.cropSubtype);
   requestData.append('quantityAvailable', formData.quantityAvailable);
   requestData.append('organicOrInorganic', formData.organicOrInorganic);
  
   for (let i = 0; i < formData.files.length; i++) {
    requestData.append('files', formData.files[i]);
    }

    
   for (let i = 0; i < formData.docsFiles.length; i++) {
    requestData.append('docsFiles', formData.docsFiles[i]);
    }

    requestData.append('grainSize', formData.grainSize);
    requestData.append('presenceOfDiscoloredGrains', formData.presenceOfDiscoloredGrains);
    requestData.append('moistureContent', formData.moistureContent);
    requestData.append('aroma', formData.aroma);
    requestData.append('brokenGrains', formData.brokenGrains);
    requestData.append('expectedTexture', formData.expectedTexture);
    requestData.append('cropCondition', formData.cropCondition);
    requestData.append('weeviledGrains', formData.weeviledGrains);
    requestData.append('complianceWithSafetyRegulations', formData.complianceWithSafetyRegulations);
    requestData.append('artificialRipening', formData.artificialRipening);
    requestData.append('harvestingDate', formData.harvestingDate);
    requestData.append('dateOfInspection', formData.dateOfInspection);
    //requestData.append('approvalStatus', formData.approvalStatus);
    requestData.append('rejectionReason', formData.rejectionReason);
    requestData.append('recommendedActions', formData.recommendedActions);
    requestData.append('notesAndComments', formData.notesAndComments);

      try {
        // Make a POST request to your backend API with headers
        const response = await axios.post(
          `/api/QCAdmin/quality-check-approve/${qcId}/${requestId}`, requestData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data', 
          },
        });
  
        console.log('API response:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'form submitted Successfully.',
        });


        if (response.status === 200) {
          // Handle success, e.g., show a success message and navigate to a different page
          console.log('Approval form submitted successfully.');
          console.log('API response:', response.data);
          navigate('/QCViewFReqList');
          //navigate('/QCFormSubmit'); // Replace 'successPage' with the actual success page path
        
        } else {
          // Handle other status codes or show an error message
          console.error('Error:', response.data);
        }
      } catch (error) {
        // Handle any error or show a failure message
        console.error('Error:', error);
      }
    };


    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };

    const handleFileChange = (e) => {
      const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
      setFormData({ ...formData, files: selectedFiles });
    };

    const handleDocumentFileChange = (e) => {
      const selectedFiles = Array.from(e.target.files);
      setFormData({ ...formData, docsFiles: selectedFiles }); // Update the state
      
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

    <div className="QCformblock">
    
    <form className='QCform' onSubmit={handleSubmit} >
    <h2 className='title'>Approval Form</h2>
    <br></br>
    <br></br>
    <br></br>

    <div className="mb-4">
        <label className='QClabels' htmlFor="Description">
        Farm Location : 
        </label>
        <input
        
          type="text"
          id="farmLocation"
          name="farmLocation"
          value={formData.farmLocation}
          onChange={handleChange}
          className="addfarminputtags"
        />
      </div>

     

      <div className="mb-4">
        <label className='QClabels' htmlFor="cropRetailPrice">
        Farm Area (In Acre) :
        </label>
        <input
       type="number"
       id="farmArea"
       name="farmArea"
       
          value={formData.farmArea}
          onChange={handleChange}
          className="addfarminputtags"
        />
      </div>


      {/*  Check farmer's uploaded data with actual crops */}

      <div className="mb-4">
        <label htmlFor="perishable">Crop Name :  {cropName}</label>
        <select
          id="perishable"
          name="cropTypes"
          checked={formData.cropTypes}
          onChange={handleChange}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="perishable">Crop Sub Type : {cropSubType}</label>
        <select
          id="perishable"
          name="cropSubtype"
          checked={formData.cropSubtype}
          onChange={handleChange}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
  
      <div className="mb-4">
        <label htmlFor="perishable">Quantity Available : {quantityAvailable}</label>
        <select
          id="perishable"
          name="quantityAvailable"
          checked={formData.quantityAvailable}
          onChange={handleChange}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="perishable"> {organicInOrganic ? 'Organic' : 'Inorganic'}</label>
        <select
          id="perishable"
          name="organicOrInorganic"
          checked={formData.organicOrInorganic}
          onChange={handleChange}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

        {/*   high mid low  */}


        <div className="mb-4">
  <label htmlFor="perishable">Grain Size and Shape</label>
  <select
    id="perishable"
    name="grainSize"
    value={formData.grainSize}
    onChange={handleChange}
  >
        <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>
</div>

<div className="mb-4">
  <label htmlFor="perishable">Discolored Grains</label>
  <select
   id="perishable"
   name="presenceOfDiscoloredGrains"
    value={formData.presenceOfDiscoloredGrains}
    onChange={handleChange}
  >
        <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>
</div>

<div className="mb-4">
  <label htmlFor="perishable">Broken Grains</label>
  <select
    id="perishable"
    name="brokenGrains"
    value={formData.brokenGrains}
    onChange={handleChange}
  >
        <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>
</div>


<div className="mb-4">
  <label htmlFor="perishable" className='QClabels'>
    Weeviled Grains
  </label>
  <select
    id="perishable"
    name="weeviledGrains"
    value={formData.weeviledGrains}
    onChange={handleChange}
  >
       <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>
</div>


<div className="mb-4">
  <label htmlFor="perishable">Moisture Content</label>
  <select
    id="perishable"
    name="moistureContent"
    value={formData.moistureContent}
    onChange={handleChange}
  >
        <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>
</div>


<div className="mb-4">
  <label htmlFor="perishable">Aroma</label>
  <select
   id="perishable"
   name="aroma"
    value={formData.aroma}
    onChange={handleChange}
  >
        <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>
</div>

<div className="mb-4">
  <label htmlFor="perishable">Expected Texture</label>
  <select
    id="perishable"
    name="expectedTexture"
    value={formData.expectedTexture}
    onChange={handleChange}
  >
      <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>
</div>


<div className="mb-4">
  <label htmlFor="perishable">Crop Condition</label>
  <select
   id="perishable"
   name="cropCondition"
    value={formData.cropCondition}
    onChange={handleChange}
  >
        <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>
</div>

{/* safty appliance */}

<div className="mb-4">
        <label htmlFor="perishable">Compliance With Safety Regulations</label>
        <select
          id="perishable"
          name="complianceWithSafetyRegulations"
          checked={formData.complianceWithSafetyRegulations}
          onChange={handleChange}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>


      <div className="mb-4">
        <label htmlFor="perishable">Artificial Ripening</label>
        <select
          id="perishable"
          name="artificialRipening"
          checked={formData.artificialRipening}
          onChange={handleChange}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

{/* dates */}

<div className="mb-4">
        <label htmlFor="perishable">Harvesting Date</label>
                
                <input
                  type="date"
                  id="harvestingDate"
                  name="harvestingDate"
                  checked={formData.harvestingDate}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
        <label htmlFor="perishable">Date Of Inspection</label>
               
                <input
                  type="date"
                  id="dateOfInspection"
                  name="dateOfInspection"
                  checked={formData.dateOfInspection}
                  onChange={handleChange}
                />
              </div>




{/*  imges */}
        <div className="mb-4">
        <label htmlFor="imageFiles"  className='QClabels'>
       Upload crop images
        </label>
        <input
          type="file"
          id="imageFiles"
          name="files"
          
          onChange={handleFileChange}
          multiple
          className="addfarminputtags"
        />
      </div>
     
      <div className="mb-4">
        <label htmlFor="documentFiles"  className='QClabels'>
       Upload documents
        </label>
        <input
          type="file"
          id="documentFiles"
          name="docsFiles"
          onChange={handleDocumentFileChange}
          multiple
          className="addfarminputtags"
        />
      </div>
      

      
{/* Give your feedback */}
      <div className="mb-4">
        <label htmlFor=" Description"  className='QClabels'>
        Rejection Reason
        </label>
        <input
          type="text"
          id="Description"
          name="rejectionReason"
          value={formData.rejectionReason}
          onChange={handleChange}
          className="addfarminputtags"
        />
      </div>
      <div className="mb-4">
          <label htmlFor="Description" className="QClabels">
          Recommended Actions  
          </label>
          <input
             type="text"
             id="Description"
             name="recommendedActions"
            value={formData.recommendedActions}
          onChange={handleChange}
            className="addfarminputtags"
          />
        </div>
      
{/*                         Notes And Comments                       */}


{/*  once submit dont show Approve button   */}
      <div className="divQCbutton">
      <button
           type="submit"
           className="addQCbutton">
          Submit
      </button>
      </div>

    </form>
    
  </div> 
  
  </div>
</div>
 

  );
}
export default QCApprovalForm;