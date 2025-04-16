import React from 'react';
import '../Styling/Button.css';  // Import custom CSS for styling

const Button = ({ label, onClick, className, disabled, svgLogo }) => {
  return (
    <button 
      className={`button ${className} ${disabled ? 'disabled' : ''}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {/* Render SVG if passed */}
      {svgLogo && <span className="button-icon">{svgLogo}</span>}
      <span className="button-label">{label}</span>
    </button>
  );
};

export default Button;
