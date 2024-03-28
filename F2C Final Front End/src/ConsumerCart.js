import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './ConsumerCart.css';
import logo from '../src/logo3.png';
const ConsumerCart = () => {
const { consumerId } = useParams();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCartItemIds, setSelectedCartItemIds] = useState([]); //for check selected cart items 
  const navigate = useNavigate();

  const logoutFunc = () => {
    Cookies.remove('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('phoneNo');
console.log("logoutexecuted");
    navigate('/signin');
  };

console.log(consumerId);
const accessToken = Cookies.get('accessToken'); // Add your access token here
const fetchCartData = async () => {
  try {
    // Make a GET request to fetch the user's cart using the authorization header
    const response = await axios.get(
      `/api/rolec/${consumerId}/cart`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    setCart(response.data);
    setLoading(false);
    console.log(response.data)
  } catch (error) {
    setError(error);
    setLoading(false);
    // console.log(error);
  }
};
useEffect(() => {
  

  fetchCartData();
}, []);

const handleToggleCartItem = (cartItemId) => {
    if (selectedCartItemIds.includes(cartItemId)) {
      // Remove the cart item from the selected items
      setSelectedCartItemIds((prevIds) =>
        prevIds.filter((id) => id !== cartItemId)
      );
    } else {
      // Add the cart item to the selected items
      setSelectedCartItemIds((prevIds) => [...prevIds, cartItemId]);
    }
  };

  const handlePlaceOrder = async () => {
    console.log('Selected Cart Item IDs:', selectedCartItemIds);
    try {
      // Make a POST request to place an order for selected items
      const response = await axios.post(
        `/api/rolec/${consumerId}/place-order/${selectedCartItemIds.join(',')}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("This is Some Response ",response.data);
      console.log('Selected Cart Item IDs:', selectedCartItemIds);
  
    
        const orderId = response.data;
        // Navigate to the ConsumerOrder page with the orderId
        navigate(`/ConsumerOrder/${consumerId}/${orderId}`);
    
    } catch (error) {
      console.error('Failed to place the order:', error);
    }
  };
const handleViewCartItem = (consumerId,cropId)=>{
     navigate(`/ViewSingleCrop/${consumerId}/${cropId}`)
}
const handleDeleteCartItem = async(consumerId,cartItemId)=>{
  try {
    // Make a POST request to place an order for selected items
    const response = await axios.delete(
      `/api/rolec/${consumerId}/cart/${cartItemId}`,
      
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response.data);
    fetchCartData();
  
  } catch (error) {
    console.error('Failed to delete item :', error);
  }
}



  return (
  <div className="cons-dashboard">
  <nav className="consumerleft-navigation">
  <img className="logo" src={logo} alt="logo" />
    <ul>
<Link to="/consumerdashboard">     <li><button className='consumerleftnavbuttonhome'>Home</button></li></Link> 
 <Link to="/crops"> <li><button>Products</button></li></Link> 
 <Link to={`/consumerCart/${consumerId}`}><li><button className='consumerleftnavbuttonmycart'> My Cart</button></li></Link>
 <Link to="/myOrders">  <li><button>Orders</button></li> </Link> 
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
    
   <div className="cart-container">
  <h1 className='h1consumercart'>Your Cart</h1>
  <div className="cart-content">
    {loading ? (
      <p className="loading">Loading your cart...</p>
    ) : cart && cart.cropItems ? (
      <div>
        {cart.cropItems.map((item) => (
          <div className="cart-item" key={item.cartItemId}>
            <h2>Crop Name: {item.cropDetailsList[0].cropName}</h2>
            <p>Crop SubType: {item.cropDetailsList[0].cropSubType}</p>
            <p>Crop Wholesale Price (/Kg): Rs.{item.cropDetailsList[0].cropWholesalePrice} </p>
            <p>Quantity (Kg): {item.cartItemQuantity}</p>
            <p>Price: Rs.{item.cartItemPrice}</p>
            {/* Add more crop details here */}
            {/* <p>Crop ID: {item.cropDetailsList[0].cropId}</p> */}
            <label className='cart-checkboxlabel' for="cart-checkbox">Purchase</label>
            <input
              type="checkbox"
              className="cart-checkbox"
              checked={selectedCartItemIds.includes(item.cartItemId)}
              onChange={() => handleToggleCartItem(item.cartItemId)}
            />
            {/* Add more details as needed */}
            <div className="cart-item-buttons">
              <button className="view-button" onClick={()=>handleViewCartItem(consumerId, item.cropDetailsList[0].cropId)}>View</button>
              <button className="delete-button" onClick={()=>handleDeleteCartItem(consumerId,item.cartItemId)}>Delete</button>
            </div>
          </div>
        ))}
        <p className="total-price">Total Price (Rs.): {cart.finalPrice}</p>
        <p className="total-quantity">Total Quantity (Kg): {cart.finalQuantity}</p>
        <button className="place-order-button" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    ) : (
      <p className="empty-cart">Your cart is empty.</p>
    )}
  </div>
</div>

 
  </div>
</div>

  );
      }
export default ConsumerCart;
