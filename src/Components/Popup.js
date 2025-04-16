import React, { useEffect } from 'react';
import '../Styling/Popup.css';

const Popup = ({ message, type = 'success', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`popup-wrapper ${type}`}>
      <div className="popup-content">
        <span>{message}</span>
        <button className="popup-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default Popup;
