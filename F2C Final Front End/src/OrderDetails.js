// OrderDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import logo from '../src/logo3.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
const OrderDetails = () => {
    const { orderId, orderItemId } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const consumerId = localStorage.getItem("userId");
  const accessToken = Cookies.get('accessToken');
  const navigate = useNavigate();
  const logoutFunc = () => {
    Cookies.remove('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('phoneNo');
console.log("logoutexecuted");
    navigate('/signin');
  };
  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/rolec/${consumerId}/view-order-details/${orderId}/${orderItemId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setOrderDetail(response.data);
      } catch (error) {
        setError(error.message || 'Error fetching order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId, orderItemId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
      <div className='consumerviewsinglereqdivcontainer'>
       <div className="qcviewsinglereqcontainer">
       <h1 className='qcviewsinglereqh1'>Order Details</h1>
        <div className='consumerviewsinglereqdiv'>
        <div className='qcview-detail'>
              <strong>Images:</strong>
              <div className='qcview-detail-value'>
                {orderDetail.images && orderDetail.images.map((image, index) => (
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  <img
                    key={index}
                    src={`data:image/jpeg;base64,${image}`}
                    alt={`Image ${index + 1}`}
                    
                    style={{ maxWidth: '50%', height: '50%' }}
                  />
                ))}
              </div>
            </div>
            <div className='qcview-detail'>
          <strong></strong>
         <div className='qcview-detail-value'></div>
          </div>
          <div className='qcview-detail'>
          <strong>Order ID:</strong>
         <div className='qcview-detail-value'>{orderDetail.orderId}</div>
          </div>
          <div className='qcview-detail'>
    <strong>Crop ID:</strong>
    <div className='qcview-detail-value'>{orderDetail.cropId}</div>
  </div>
 

  <div className='qcview-detail'>
    <strong>Order Date:</strong>
    <div className='qcview-detail-value'>{new Date(orderDetail.orderDateTime).toLocaleDateString()}</div>
  </div>

  <div className='qcview-detail'>
    <strong>Delivery Date:</strong>
    <div className='qcview-detail-value'>{new Date(orderDetail.probableDeliveryDateTime).toLocaleDateString()}</div>
  </div>

  <div className='qcview-detail'>
    <strong>Farmer Name:</strong>
    <div className='qcview-detail-value'>{orderDetail.farmerName}</div>
  </div>
  <div className='qcview-detail'>
    <strong>Crop Name:</strong>
    <div className='qcview-detail-value'>{orderDetail.cropName}</div>
  </div>
  <div className='qcview-detail'>
    <strong>Delivery Address:</strong>
    <div className='qcview-detail-value'>{orderDetail.address}</div>
  </div>
  <div className='qcview-detail'>
    <strong>Farmer Address:</strong>
    <div className='qcview-detail-value'>{orderDetail.farmerAddress}</div>
  </div>

 
  
  <div className='qcview-detail'>
    <strong>Order Status :</strong>
    <div className='qcview-detail-value'>{orderDetail.orderStatus}</div>
  </div>
  <div className='qcview-detail'>
    <strong>Price per Unit (Kg):</strong>
    <div className='qcview-detail-value'>{orderDetail.itemPrice}</div>
  </div>
  <div className='qcview-detail'>
    <strong>Total Amount (Rs):</strong>
    <div className='qcview-detail-value'>{orderDetail.totalAmount}</div>
  </div>

  <div className='qcview-detail'>
    <strong>Total Quantity (Kgs):</strong>
    <div className='qcview-detail-value'>{orderDetail.totalQuantity}</div>
  </div>

 
  
    </div>
       </div>
    </div>
   
    </div>
  </div>

   
   
  );
};

export default OrderDetails;
