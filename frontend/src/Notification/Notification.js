import React, { useContext, useEffect, useState } from 'react';
import { RiNotification2Fill } from 'react-icons/ri';
import './Notification.css';
import axios from 'axios';
import NotificationContext from '../ContextAPI/NotificationContext';

const Notification = () => {
  const token = localStorage.getItem("user-token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const { notificationCount, setNotificationCount } = useContext(NotificationContext);
  const[notif, setNotif] = useState([])
  const [isNewNotification, setIsNewNotification] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/feed');
        const newNotifications = response.data.filter((notification) => !notification.isRead);
        setNotif(newNotifications);
        setIsNewNotification(newNotifications.length > 0);
        setNotificationCount(newNotifications.length);
        console.log(notificationCount, "count");
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const handleClick = () => {
    setIsNewNotification(false);
    setNotificationCount(0);
  };

  return (
    <div className="notification">
      <RiNotification2Fill className='notification-icon' onClick={handleClick} />
      {isNewNotification && <div className="notification-count">{notificationCount  > 9 ? '9+' : notificationCount }</div>}
      <div className="notification-dropdown">
        {
          notif.map((det, id) => {
            return(
              <>
              <div className="notification-dropdown-item" key={id}>
                {det.username} uploaded a new post
              </div>
              </>
            )
          })
        }
      </div>
    </div>
  );
};

export default Notification;
