import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './ViewSingleCrop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Import the shopping cart icon
import logo from '../src/logo3.png';

import Swal from 'sweetalert2'; 

const ViewSingleCrop = () => {
  const { consumerId, cropId } = useParams(); // Retrieve both consumerId and cropId from URL
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const incrementQuantity = () => {
     setQuantity(quantity + 1);
   };
   
    const decrementQuantity = () => {
     if (quantity > 1) {
     setQuantity(quantity - 1);
     }
    };
    // const initialVariants = {
    //   opacity: 0,
    //   scale: 0.9,
    // };
  
    // const animateVariants = {
    //   opacity: 1,
    //   scale: 1,
    //   transition: {
    //     duration: 0.2,
    //     ease: "easeInOut",
    //     bounce:0.8,
    //   },
    // };
  
    // const [isVisible, setIsVisible] = useState(false);
    
    const handleDirectPlaceOrder= async (consumerId,cropId,quantity) => {
      try {
        // Make a POST request to add the product to the cart
        const response =  await axios.post(
          `/api/rolec/${consumerId}/placeDirectOrder/${cropId}/${quantity}`,null,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        // Notify the user that the product has been added to the cart
        //alert('Product added to cart successfully.');
        const orderId = response.data;
        console.log("OrderId:",orderId);
        localStorage.setItem("cropID",cropId);
        // Navigate to the ConsumerOrder page with the orderId
        navigate(`/ConsumerOrder/${consumerId}/${orderId}`);
       
      } catch (error) {
        alert('Failed to place order: ' + error.message);
      }
    }
  
  
  const accessToken = Cookies.get('accessToken'); // Add your access token here

  useEffect(() => {
    const fetchCropDetails = async () => {
      try {
        // Make a GET request to fetch details of the selected crop using both IDs
        const response = await axios.get(
          //`/api/rolec/${consumerId}/cropById/${cropId}`, // without img
          `/api/rolec/${consumerId}/cropByIdimg/${cropId}`,  // with img
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setCrop(response.data);
        setLoading(false);
        
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCropDetails();
  }, [consumerId, cropId, accessToken]); // Include both IDs and accessToken in the dependency array
  
  // Add to Cart button 
  const handleAddToCart = async () => {
    console.log(quantity);
    try {
      // Make a POST request to add the product to the cart
      await axios.post(
        `/api/rolec/${consumerId}/${cropId}/add-to-cart/${quantity}`,null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // Notify the user that the product has been added to the cart
      // alert('Product added to cart successfully.');
      localStorage.setItem("cropID",cropId);
      // setIsVisible(true);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your Item has been Added To Cart Successfully.',
      });
    } catch (error) {
      alert('Failed to add product to cart: ' + error.message);
    }
  };


  //Cart View Page 
  const navigateToCart = () => {
    // Replace '/consumerCart' with the actual URL of your consumerCart page
    navigate(`/consumerCart/${consumerId}`);
  }
  return (
    <div className="cons-dashboard">
      <nav className="consumerleft-navigation">
      <img className="logo" src={logo} alt="logo" />

        <ul>
    <Link to="/consumerdashboard">     <li><button className='consumerleftnavbuttonhome'>Home</button></li></Link> 
     <Link to="/crops"> <li><button>Products</button></li></Link> 
     <Link to="/consumerCart/:consumerId"><li><button className='consumerleftnavbuttonmycart'> My Cart</button></li></Link>
     <Link to="/myOrders">  <li><button>Orders</button></li> </Link> 
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
        
    <div className="viewsinglecrop-details-container">
    <div className="header">
      <div className="cart-button">
        <FontAwesomeIcon icon={faShoppingCart} size="lg" onClick={navigateToCart} />
      </div>
      <h1>Crop Details</h1>
    </div>
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>Error: {error.message}</p>
    ) : crop ? (
      <div className="crop-details">
        <h2>{crop.cropName}</h2>
        {/* <p>Quantity: {crop.cropQuantity}</p> */}
        <p>Subtype: {crop.cropSubType}</p>
        <p>Wholesale Price (Rs./Kg) : {crop.cropWholesalePrice}</p>
        <p>Retail Price (Rs./Kg) : {crop.cropRetailPrice}</p>
        {/* <p>Description: {crop.description}</p> */}
        <p>Organic : {crop.organic ? 'Yes' : 'No'}</p>
        <p>Verified crop : {crop.published ? 'Yes' : 'No'}</p> {/* publish*/}
        {/* Quantity Buttons */}
        <div className="quantity-container">
          <p>
            Quantity (Kg) :<span>  </span>
            <button className="quantity-button" onClick={decrementQuantity}>-</button>
            <span>{quantity}</span>
            <button className="quantity-button" onClick={incrementQuantity}>+</button>
          </p>
        </div>
        {/* Button Container */}
        <div className="button-container">
          <button className="button" onClick={handleAddToCart}>Add to Cart</button>
          {/* {isVisible && <motion.div
      initial={initialVariants}
      animate={animateVariants} style={{
        position: "fixed",
        top: "26%",
        left: "38%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 300,
          backgroundColor: "#ffffff",
          border: "1px solid #cccccc",
          borderRadius: 5,
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
      }}  
      className='pop-up-screen'
      
    >
       <motion.lottie src={animationJSON} loop autoplay />
      <h1>Success</h1>
     <p className='popupscreenparag'>Product added to cart Successfully !</p>
      <button onClick={() => setIsVisible(false)}>Close</button>
    </motion.div>} */}
    <button className="button" onClick={()=>handleDirectPlaceOrder(consumerId,crop.cropId,quantity)}>Place Order</button>
        </div>
        {/* Display Images */}
        <div className="image-container">
          {crop.images &&
            crop.images.map((image, imgIndex) => (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                key={imgIndex}
                src={`data:image/jpeg;base64,${image}`}
                alt={`Crop Image ${imgIndex}`}
              />
            ))}
        </div>
      </div>
    ) : (
      <p>No data found for this crop.</p>
    )}
  </div>
  
     
      </div>
    </div>
    
  );
};

export default ViewSingleCrop;
