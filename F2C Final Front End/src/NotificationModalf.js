import React from 'react';
import { Link } from 'react-router-dom';
import './NotificationModal.css';

const NotificationModalf = ({ notifications, onClose }) => {
  // Reverse the order of notifications to display new ones first
  const reversedNotifications = [...notifications].reverse();

  return (
    <div className="notification-modal">
      <div className="modal-content">
        {reversedNotifications.length === 0 ? (
          <p>No new notifications</p>
        ) : (
          reversedNotifications.map((notification) => (
            <div key={notification.orderId} className="notification-box">
              <p>
                Order request for {notification.cropName} by {notification.userName}
              </p>
              {/* <p>Order ID: {notification.orderId}</p> */}
              <p>Order Date: {notification.orderDateTime.join('/')}</p>
              {/* <p>Delivery Date: {notification.probableDeliveryDateTime.join('/')}</p> */}
              <p>Total Amount: {notification.totalAmount}</p>
              {/* <Link to={`/order-details/${notification.orderId}`} className="view-details-link">
                View Details
              </Link> */}
            </div>
          ))
        )}
      </div> 
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default NotificationModalf;
