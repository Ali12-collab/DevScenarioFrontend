import React from 'react';
import '../Styling/LoadingSpinner.css'; // We'll create this next

const LoadingSpinner = ({ label = 'Loading...', fullPage = false }) => {
  return (
    <div className={`custom-loader-wrapper ${fullPage ? 'full-page' : ''}`}>
      <div className="custom-spinner"></div>
      <span className="custom-spinner-label">{label}</span>
    </div>
  );
};

export default LoadingSpinner;
