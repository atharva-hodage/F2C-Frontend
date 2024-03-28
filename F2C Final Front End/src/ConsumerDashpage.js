
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import './CropDetails.css';
// import {useNavigate } from 'react-router-dom';
// const CropDetails = () => {
//   const [cropData, setCropData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [searchQuery, setSearchQuery] = useState('');

//   const accessToken = Cookies.get('accessToken');
//   const consumerId = localStorage.getItem('userId');
//   const navigate = useNavigate();



//   const handleViewCrop = (consumerId, cropId) => {
    
 
//     console.log(cropId);
//     // Navigate to the ViewSingleCrop component with both consumerId and cropId as parameters
//    navigate(`/ViewSingleCrop/${consumerId}/${cropId}`);
//   };
  
//   // Function to fetch crop data based on whether a search query is present
//   const fetchData = async (page, query) => {
//     try {
//       let apiUrl = `/api/rolef/crops?page=${page}`;

//       if (query) {
//         apiUrl = `/api/rolef/search?page=${page}&query=${query}`;
//       }

//       const response = await axios.get(apiUrl, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       console.log(response.data);
//       setCropData(response.data.crops);
//       setCurrentPage(response.data.currentPage);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   // Initial data fetch when the component mounts
//   useEffect(() => {
//     fetchData(currentPage, searchQuery);
//   }, [currentPage, searchQuery]);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleSearch = () => {
//     setCurrentPage(0); // Reset to the first page when searching
//     fetchData(0, searchQuery);
//   };


//   return (
// <div className="crop-details-container">
//       <h1>Crop Details</h1>
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search for crops..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>

//       <ul>
//         {cropData.map((crop, index) => (
//           <li key={index}>
//             <h2>{crop.cropName}</h2>
//             <p>Quantity: {crop.cropQuantity}</p>
//             <p>Subtype: {crop.cropSubType}</p>
//             <p>Wholesale Price: {crop.cropWholesalePrice}</p>
//             <p>Retail Price: {crop.cropRetailPrice}</p>
//             <p>Description: {crop.description}</p>
//             <p>Published: {crop.published ? 'Yes' : 'No'}</p>
//             {/* Display Images */}
//             <div>
//               {crop.images && crop.images.map((image, imgIndex) => (
//                 <img key={imgIndex} src={`data:image/jpeg;base64,${image}`} alt={`Crop ${index} Image ${imgIndex}`} />
//               ))}
//             </div>

//             {/* View Button */}
//             <button onClick={() => handleViewCrop(consumerId, crop.cropId)}>View</button>
            
//           </li>
//         ))}
//       </ul>
//       <div className='pagination-buttons'>
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 0}
//         >
//           {currentPage-1}
//         </button>
//         {currentPage}
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages - 1}
//         >
//           {currentPage+1}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CropDetails;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './ConsumerDashpage.css';
import logo from '../src/logo3.png';

import {Link, useNavigate } from 'react-router-dom';
const CropDetails = () => {
  const [cropData, setCropData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const accessToken = Cookies.get('accessToken');
  const consumerId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const logoutFunc = () => {
    Cookies.remove('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('phoneNo');
console.log("logoutexecuted");
    navigate('/signin');
  };

  const handleViewCrop = (consumerId, cropId) => {
    
 
    console.log(cropId);
    // Navigate to the ViewSingleCrop component with both consumerId and cropId as parameters
   navigate(`/ViewSingleCrop/${consumerId}/${cropId}`);
  };
  
  // Function to fetch crop data based on whether a search query is present
  const fetchData = async (page, query) => {
    try {
      let apiUrl = `/api/rolef/crops?page=${page}`;

      if (query) {
        apiUrl = `/api/rolef/search?page=${page}&query=${query}`;
      }

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setCropData(response.data.crops);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Initial data fetch when the component mounts
  useEffect(() => {
    fetchData(currentPage, searchQuery);
    window.scrollTo(0, 0);
  }, [currentPage, searchQuery]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleSearch = () => {
    setCurrentPage(0); // Reset to the first page when searching
    fetchData(0, searchQuery);
  };


  return (
    <div className="cons-dashboard">
    <nav className="consumerleft-navigation">
    <img className="logo" src={logo} alt="logo" />

      <ul>
  <Link to="/consumerdashboard">     <li><button className='consumerleftnavbuttonhome'>Home</button></li></Link> 
   <Link to="/crops"> <li><button>Products</button></li></Link> 
   <Link to={`/consumerCart/${consumerId}`}><li><button className='consumerleftnavbuttonmycart'> My Cart</button></li></Link>
   <Link to="/myOrders">  <li><button className='consumerleftnavbuttonorder'>Orders</button></li> </Link> 
   <li><button onClick={logoutFunc}  className="listfarmerdashboard">Logout</button></li>

   
        {/* <li><button>Transaction</button></li>
        <li><button>Notification</button></li> */}
        {/* <li><button>Setting</button></li>
        <li><button>Logout</button></li> */}
      </ul>
    </nav>
    <div className="content">
      <header   className="consumertop-navigation">
        {/* Add your top navigation content here */}
        <h1  className="welcome-text">Welcome to F2C Portal</h1>
                
        {/* Notification icon */}
          <div className="notification-icon">
          <i className="fas fa-bell"></i>
        </div>
        <button className="consumerprofile-button">Profile</button>

      </header>
      {/* Add your main content here */}
       {/* Search filter */}
       {/* <div className="search-filter">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
        />
        <button className="search-button">Search</button>
      </div> */}
      <div className='consumerdashpagecontainerdiv'>
        
  <div className='consumerdashpagecontainer'>
<div className="crop-search-container">
  {/* <h1>Crop Details</h1> */}
  <div className="search-bar">  
    <input
      type="text"
      placeholder="Search for crops..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <button onClick={handleSearch}>Search</button>
  </div>
</div>

<div className="consumerdashpagecrop-details-container">
  <div className="crop-grid">
    {cropData.map((crop, index) => (
      <div className="crop-card" key={index}>
        <div className="crop-grid-inner">
          <div className="crop-image">
            {/* Display Images */}
            {crop.images && crop.images.map((image, imgIndex) => (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                key={imgIndex}
                src={`data:image/jpeg;base64,${image}`}
                alt={`Crop ${index} Image ${imgIndex}`}
              />
            ))}
          </div>
          <div className="crop-details">
            <h4>{crop.cropName}</h4>
            <p>Quantity (Kg) : {crop.cropQuantity}</p>
            <p>Subtype: {crop.cropSubType}</p>
            <p>Wholesale Price (Rs): {crop.cropWholesalePrice}</p>
            <p>Retail Price (Rs): {crop.cropRetailPrice}</p>
            {/* <p>Description: {crop.description}</p> */}
            {/* <p>Published: {crop.published ? 'Yes' : 'No'}</p> */}
            <button className='cropviewbutton' onClick={() => handleViewCrop(consumerId, crop.cropId)}>View</button>
          </div>
        </div>
      </div>
    ))}
  </div>

  <div className="pagination-buttons">
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 0}
    >
      Previous Page
    </button>
    <span className='paginationspan'>Page  {currentPage + 1} </span>
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages - 1}
    >
      Next Page
    </button>
  </div>
</div>

</div>
      </div>
   
    </div>
  </div>
  
  );
};

export default CropDetails;



















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// //import './Pagination.css'
// const ConsumerDashboard = () => {
//   const [cropData, setCropData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0); // Current page of pagination
//   const [totalPages, setTotalPages] = useState(0); 
//   // Function to fetch all crop data
//   const accessToken = Cookies.get('accessToken');
//   const fetchAllCropData = async (page) => {
//     try {
//       // Make a GET request to your Spring Boot API to fetch all crop details
//       const response = await axios.get(`http://localhost:8080/api/rolef/crops?page=${page}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       // Update state with fetched data
//       setCropData(response.data.crops);
//       //setCropData(response.data.crops);
//       setCurrentPage(response.data.currentPage);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   // Initial data fetch when the component mounts
//   useEffect(() => {
//     fetchAllCropData(currentPage);
//   }, [currentPage]);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };


//   return (
//     <div>
//       <h1>Crop Details</h1>
//       <ul>
//         {cropData.map((crop, index) => (
//           <li key={index}>
//             <h2>{crop.cropName}</h2>
//             <p>Quantity: {crop.cropQuantity}</p>
//             <p>Subtype: {crop.cropSubType}</p>
//             <p>Wholesale Price: {crop.cropWholesalePrice}</p>
//             <p>Retail Price: {crop.cropRetailPrice}</p>
//             <p>Description: {crop.description}</p>
//             <p>Published: {crop.published ? 'Yes' : 'No'}</p>
//             {/* Display Images */}
//             <div>
//               {crop.images && crop.images.map((image, imgIndex) => (
//                 <img key={imgIndex} src={`data:image/jpeg;base64,${image}`} alt={`Crop ${index} Image ${imgIndex}`} />
//               ))}
//             </div>
//           </li>
//         ))}
//       </ul>
//       <div className='pagination-buttons'>
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 0}
//         >
//           {currentPage-1}
//         </button>
//         {currentPage}
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages - 1}
//         >
//           {currentPage+1}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ConsumerDashboard;
