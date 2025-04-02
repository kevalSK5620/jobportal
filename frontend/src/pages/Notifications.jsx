import React, { useState, useEffect } from 'react';
import "../assets/Notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://your-websocket-server-url');

    ws.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prev) => [newNotification, ...prev]);
    };

    return () => ws.close();
  }, []);

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="notification-item">
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
