import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../src/logo3.png';

const OrderTable = () => {
  const [orderResponses, setOrderResponses] = useState([]);
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
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/rolec/view-all-orders/${consumerId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setOrderResponses(response.data);
    } catch (error) {
      setError(error.message || 'Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

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
          <Link to="/consumerdashboard">
            <li><button className='consumerleftnavbuttonhome'>Home</button></li>
          </Link>
          <Link to="/crops">
            <li><button>Products</button></li>
          </Link>
          <Link to={`/consumerCart/${consumerId}`}>
            <li><button className='consumerleftnavbuttonmycart'> My Cart</button></li>
          </Link>
          <Link to="/myOrders">
            <li><button className='consumerleftnavbuttonorder'>Orders</button></li>
          </Link>
          <li><button onClick={logoutFunc} className="listfarmerdashboard">Logout</button></li>
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
        <div className='consumerdashpagecontainerdiv'>
          <div className='getcropdetailstablecontainer'>
            <div>
              <table className='getcropdetailstable'>
                <thead className='getcropdetailstablehead'>
                  <tr>
                    <th>Crop Name</th>
                    <th>Total Amount</th>
                    <th>Total Quantity</th>
                    <th>Order Date</th>
                    <th>Delivery Date</th>
                    <th>Status</th>
                    <th>Farmer Name</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody className='getcropdetailstbody'>
                  {orderResponses && orderResponses.map((orderResponse) => (
                    <tr key={orderResponse.orderItemId}>
                      <td>{orderResponse.cropName}</td>
                      <td>{orderResponse.totalAmount}</td>
                      <td>{orderResponse.totalQuantity}</td>
                      <td>{orderResponse.orderDateTime ? new Date(orderResponse.orderDateTime[0], orderResponse.orderDateTime[1] - 1, orderResponse.orderDateTime[2]).toLocaleDateString() : 'N/A'}</td>
                      <td>{orderResponse.probableDeliveryDateTime ? new Date(orderResponse.probableDeliveryDateTime[0], orderResponse.probableDeliveryDateTime[1] - 1, orderResponse.probableDeliveryDateTime[2]).toLocaleDateString() : 'N/A'}</td>
                      <td>{orderResponse.orderStatus}</td>
                      <td>{orderResponse.farmerName}</td>
                      <td>
                        <Link to={`/order-details/${orderResponse.orderId}/${orderResponse.orderItemId}`}>
                          <button className='getorderdetailsbutton'>View Details</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
