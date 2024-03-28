

import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import CropForm from './CropForm';
import './AddFarmProduct.css'
import Swal from 'sweetalert2'; 

import {  useNavigate } from 'react-router-dom';
import FarmerSideNavigationbar from './FarmerSideNavigationbar';
import FarmerHeaderBar from './FarmerHeaderBar';
function AddFarmProduct() {
  const [formData, setFormData] = useState({
    cropName: '',
    cropSubType: '',
    cropRetailPrice: '',
    cropWholesalePrice: '',
    cropQuantity: '',
    Description: '',
    files: [],
    perishable: '',
    status: 'false',
  });

  const [adjustedRetailPrice, setAdjustedRetailPrice] = useState('');
  const [adjustedWholesalePrice, setAdjustedWholesalePrice] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Include your JWT access token from the cookie or wherever it's stored
    const accessToken = Cookies.get('accessToken');
    const farmerId = localStorage.getItem('userId');

    // Calculate adjusted prices
    const adjret = parseFloat(formData.cropRetailPrice) * 1.1; // 10% increase
    const adjustedRetail = adjret.toFixed(2);
    
    const adjwholesale= parseFloat(formData.cropWholesalePrice) * 1.08; // 8% increase
    const adjustedWholesale=adjwholesale.toFixed(2);
    // Create a FormData object to send as a multipart/form-data request
    const data = new FormData();
    data.append('cropName', formData.cropName);
    data.append('cropSubType', formData.cropSubType);
    data.append('cropRetailPrice', adjustedRetail);
    data.append('cropWholesalePrice', adjustedWholesale);
    data.append('cropQuantity', formData.cropQuantity);
    data.append('Description', formData.Description);
    for (let i = 0; i < formData.files.length; i++) {
      data.append('files', formData.files[i]);
    }
    data.append('perishable', formData.perishable);
    data.append('status', formData.status);

    try {
      const response = await axios.post(
        `/api/rolef/addNewFarmProduct/${farmerId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data', // Set content type for form data
          },
        }
      );

      console.log('API response:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Crop has been Added Successfully.',
      });

      navigate('/getcroplist');

    } catch (error) {
      console.error('API error:', error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
    setFormData({ ...formData, files: selectedFiles });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRetailPriceChange = (e) => {
    const retailPrice = parseFloat(e.target.value);
    const adjustedRetail = retailPrice * 1.1; // 10% increase
    setAdjustedRetailPrice(adjustedRetail.toFixed(2));
    handleChange(e); // Update form data as well
  };

  const handleWholesalePriceChange = (e) => {
    const wholesalePrice = parseFloat(e.target.value);
    const adjustedWholesale = wholesalePrice * 1.08; // 8% increase
    setAdjustedWholesalePrice(adjustedWholesale.toFixed(2));
    handleChange(e); // Update form data as well
  };

  return (
          
  <div className="farmer-dashboard">
  <FarmerSideNavigationbar/>
  <div className="fcontent">
   
  <FarmerHeaderBar/>
    <div className="container123">
    
    <form className='addcropsform' onSubmit={handleSubmit} >
    <h2 className='addcroph2'>Crop Form</h2>
    
      <div>
        <CropForm
          selectedCropName={formData.cropName}
          selectedCropSubtype={formData.cropSubType}
          onCropNameChange={(value) =>
            handleChange({ target: { name: 'cropName', value } })
          }
          onCropSubtypeChange={(value) =>
            handleChange({ target: { name: 'cropSubType', value } })
          }
        />
      </div>
      <div>
        <label className='addfarmlabels' htmlFor="Description">
          Description:
        </label>
        <input
          type="text"
          id="Description"
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          className="addfarminputtags"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cropQuantity"  className='addfarmlabels'>
          Crop Quantity:(Kg)
        </label>
        <input
          type="number"
          id="cropQuantity"
          name="cropQuantity"
          value={formData.cropQuantity}
          onChange={handleChange}
          className="addfarminputtags"
        />
      </div>
      <div className="mb-4">
          <label htmlFor="cropRetailPrice" className="addfarmlabels">
            Retail Price:(₹./kg)
          </label>
          <input
            type="number"
            id="cropRetailPrice"
            name="cropRetailPrice"
            value={formData.cropRetailPrice}
            onChange={handleRetailPriceChange}
            className="addfarminputtags"
          />
         
          {adjustedRetailPrice && (
            <div className="adjusted-price">
              Adjusted Retail Price: ₹{adjustedRetailPrice}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="cropWholesalePrice" className="addfarmlabels">
            Wholesale Price:(₹./kg)
          </label>
          <input
            type="number"
            id="cropWholesalePrice"
            name="cropWholesalePrice"
            value={formData.cropWholesalePrice}
            onChange={handleWholesalePriceChange}
            className="addfarminputtags"
          />
          {adjustedWholesalePrice && (
            <div className="adjusted-price">
              Adjusted Wholesale Price: ₹{adjustedWholesalePrice}
            </div>
          )}
        </div>
     
      <div className="mb-4">
        <label htmlFor="files"  className='addfarmlabels'>
          Files:
        </label>
        <input
          type="file"
          id="files"
          name="files"
          onChange={handleFileChange}
          multiple
          className="addfarminputtags"
        />
      </div>
      
        <div className="mb-4">
        <label htmlFor="perishable">Organic:</label>
        <select
          id="perishable"
          name="perishable"
          value={formData.perishable}
          onChange={handleChange}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div className="divaddfarmbutton">
      <button
           type="submit"
           className="addfarmbutton">
          Submit
      </button>
      </div>

    </form>
    
  </div>
  
  </div>
</div>
 

  );
}


export default AddFarmProduct;