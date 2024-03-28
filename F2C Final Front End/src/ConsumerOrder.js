import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './ConsumerOrder.css'; // Import your CSS file
import logo from '../src/logo3.png';

const ConsumerOrder = () => {
  const { consumerId, orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = Cookies.get('accessToken'); // Add your access token here
  const navigate = useNavigate();

  // For date formation separate function
  const formatDate = (dateArray) => {
    const date = new Date(...dateArray);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // Make a GET request to fetch the order details
        console.log("This is OrderID before ", orderId);
        const response = await axios.get(
          `/api/rolec/${consumerId}/view-order/${orderId}`,
          // Add your authorization header if needed
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("Response Data:", response.data);

        // Ensure that the date arrays are valid
        console.log("Order Date Time:", response.data.orderDateTime);
        console.log("Delivery Date Time:", response.data.probableDeliveryDateTime);

        // Format the order date
        setOrder({
          ...response.data,
          formattedOrderDate: formatDate(response.data.orderDateTime),
          deliveryDate: formatDate(response.data.probableDeliveryDateTime),
        });

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [consumerId, orderId, accessToken]);

  const handlePayment = () => {
    navigate(`/payment/${orderId}`, { state: { amount: order.totalAmount } });
  };

  return (
    <div className="cons-dashboard">
      <nav className="consumerleft-navigation">
        <img className="logo" src={logo} alt="logo" />
        <ul>
          <Link to="/consumerdashboard">
            <li><button className='consumerleftnavbuttonhome'>Home</button></li>
          </Link>
          <Link to="/crops">
            <li><button>Products</button></li>
          </Link>
          <Link to="/consumerCart/:consumerId">
            <li><button className='consumerleftnavbuttonmycart'> My Cart</button></li>
          </Link>
          <li><button>Orders</button></li>
        </ul>
      </nav>
      <div className="content">
        <header className="consumertop-navigation">
          <h1 className="welcome-text">Welcome to F2C Portal</h1>
          <div className="notification-icon">
            <i className="fas fa-bell"></i>
          </div>
          <button className="consumerprofile-button">Profile</button>
        </header>
        <div className="order-container">
          <h1 className="order-summary">Order Summary</h1>
          {loading ? (
            <p className="loading">Loading order details...</p>
          ) : order ? (
            <div className='orderdetailsdiv'>
              <p>
                <strong>Order Date and Time:</strong> {order.formattedOrderDate}
              </p>
              <p>
                <strong>Delivery Address:</strong> {order.address}
              </p>
              <p>
                <strong>Probable Delivery Date:</strong> {order.deliveryDate}
              </p>
              <p>
                <strong>Order Status: Created</strong>
              </p>
              <p>
                <strong>Total Amount:</strong> Rs.{order.totalAmount}
              </p>
              <button className='payment-button' onClick={handlePayment}>Pay Now</button>
            </div>
          ) : (
            <p className="empty-order">Order not found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsumerOrder;
