import { Bell, MessageCircle } from "lucide-react";
import React from "react";

const NotificationComponent = () => {
  return (
    <div className="notification flex gap-3 mr-3 mb-3">
      <span className="notification-text w-11 h-11 md:w-16 md:h-16 p-3 flex justify-center items-center rounded-full bg-gray-300">
        <MessageCircle className="text-black" />
      </span>
      <span className="notification-text w-11 h-11 md:w-16 md:h-16 p-3 flex justify-center items-center rounded-full bg-gray-300">
        <Bell className="text-black" />
      </span>
    </div>
  );
};

export default NotificationComponent;
