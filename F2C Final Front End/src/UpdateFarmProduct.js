import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateFarmProduct.css'
import FarmerSideNavigationbar from './FarmerSideNavigationbar';
import FarmerHeaderBar from './FarmerHeaderBar';
import Swal from 'sweetalert2'; 

function UpdateCropDetails() {
  const { cropId } = useParams();
 
  const navigate = useNavigate();
 const accessToken = Cookies.get('accessToken');
  const farmerId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    cropName: '',
    cropSubType: '',
    Description: '',
    cropRetailPrice: 0,
    cropWholesalePrice: 0,
    cropQuantity: 0,
    file: [],
    perishable: '',
    status: 'false',
   
  });



  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === 'file' ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the updated crop details to the server
    const data = new FormData();
    data.append('cropName', formData.cropName);
    data.append('cropSubType', formData.cropSubType);
    data.append('cropRetailPrice', formData.cropRetailPrice);
    data.append('cropWholesalePrice', formData.cropWholesalePrice);
    data.append('cropQuantity', formData.cropQuantity);
    data.append('Description', formData.Description);
   
      data.append('file', formData.file);
    
    data.append('perishable', formData.perishable);
    data.append('status', formData.status);
    console.log(data.get('cropName'));
    console.log(data.get('cropSubType'));
    console.log(data.get('cropRetailPrice'));
    console.log(data.get('cropWholesalePrice'));
    console.log(data.get('cropQuantity'));
    axios
      .put(`/api/rolef/updateProductById/${farmerId}/${cropId}`, data, { 
        headers :{
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          } 
          
    })
      .then((response) => {
        console.log(response.data)
        // Handle success, e.g., show a success message
        Swal.fire({
          icon: 'success',
          title: 'Updated Successfull!',
          text: 'Crop has been Updated Successfully.',
        });
        navigate('/getcroplist');
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error('Error updating crop details:', error);
      });
  };

  return (
    <div className="farmer-dashboard">
      
      <FarmerSideNavigationbar/>
    <div className="content">
     
    <FarmerHeaderBar/>
      
      <div className='updatefarmproductcontainer'>
    <h2 className='h1updatefarmproduct'>Update Crop Details</h2>
    <form className='updatefarmproductform'  onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cropName">Crop Name:</label>
        <input
          type="text"
          id="cropName"
          name="cropName"
          value={formData.cropName}
          onChange={handleChange}
          placeholder="Crop Name"
        />
      </div>

      <div>
        <label htmlFor="cropSubType">Crop Subtype:</label>
        <input
          type="text"
          id="cropSubType"
          name="cropSubType"
          value={formData.cropSubType}
          onChange={handleChange}
          placeholder="Crop Subtype"
        />
      </div>

      <div>
        <label htmlFor="Description">Description:</label>
        <input
          id="Description"
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          placeholder="Description"
        />
      </div>
      <div>
        <label htmlFor="cropQuantity">Quantity (Kg):</label>
        <input
          type="number"
          id="cropQuantity"
          name="cropQuantity"
          value={formData.cropQuantity}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="cropRetailPrice">Retail Price (Rs./kg):</label>
        <input
          type="number"
          id="cropRetailPrice"
          name="cropRetailPrice"
          value={formData.cropRetailPrice}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="cropWholesalePrice">Wholesale Price (Rs./kg):</label>
        <input
          type="number"
          id="cropWholesalePrice"
          name="cropWholesalePrice"
          value={formData.cropWholesalePrice}
          onChange={handleChange}
        />
      </div>

     

      <div>
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

      {/* <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div> */}

      <div>
        <label htmlFor="file">Upload Image:</label>
        <input 
          type="file"
          id="file"
          name="file"
          onChange={handleChange}
        />
      </div>

      <button className='updatefarmproductbutton' type="submit">Update</button>
    </form>
  </div>
    </div>
  </div>
    
  );
}

export default UpdateCropDetails;
