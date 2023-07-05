import React from 'react';
import { RiNotification2Fill } from 'react-icons/ri';
import './Notification.css';

const Notification = () => {
  return (
    <div className="notification">
      <RiNotification2Fill />
      <div className="notification-dropdown">
        <div className="notification-dropdown-item">Notification 1</div>
        <div className="notification-dropdown-item">Notification 2</div>
        <div className="notification-dropdown-item">Notification 3</div>
      </div>
    </div>
  );
};

export default Notification;
