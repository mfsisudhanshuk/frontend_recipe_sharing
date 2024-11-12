import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error"; // You can expand with more types
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  // Toast background and icon based on message type
  const toastStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
  };

  const iconStyles = {
    success: "✔️",
    error: "❌",
  };

  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 p-4 rounded-md shadow-md text-white flex items-center space-x-2 ${toastStyles[type]}`}
      role="alert"
    >
      <span>{iconStyles[type]}</span>
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-lg font-bold hover:text-opacity-75"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};