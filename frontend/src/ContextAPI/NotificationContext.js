import React, { createContext, useState } from 'react';

const NotificationContext = createContext({
  notificationCount: 0,
  setNotificationCount: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [notificationCount, setNotificationCount] = useState(0);

  return (
    <NotificationContext.Provider value={{ notificationCount, setNotificationCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
