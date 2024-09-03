import React from 'react';

interface NotificationProps {
  message: string;
  show: boolean;
}

const Notification: React.FC<NotificationProps> = ({ message, show }) => {
  return (
    <>
      {show && (
        <div className="fixed top-4 right-4 bg-green-600 text-white py-2 px-4 rounded shadow-lg z-50">
          {message}
        </div>
      )}
    </>
  );
};

export default Notification;
