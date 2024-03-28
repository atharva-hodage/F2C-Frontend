import React from 'react';
import { Link } from 'react-router-dom';
import './NotificationModal.css';
const NotificationModal = ({ notifications, onClose }) => {
  // Reverse the order of notifications to display new ones first
  const reversedNotifications = [...notifications].reverse();

  return (
    <div className="notification-modal">
      <div className="modal-content">
        {reversedNotifications.map((notification) => (
          <div key={notification.reqForQCCC} className="notification-box">
            <p>{notification.notificationMessage}</p>
            <Link to={`/QCviewFReqSingle/${notification.reqForQCCC}`} className="view-details-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default NotificationModal;