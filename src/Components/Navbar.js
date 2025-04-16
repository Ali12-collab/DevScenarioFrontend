import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import '../Styling/Navbar.css'; // Link to the custom CSS file

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-container">
      <a href="/" className="navbar-logo">Ali's Dev Scenario</a>
      <ul className="navbar-links">
        {['About Us', 'Featured', 'Testimonials'].map((text, index) => (
          <li key={index}>
            {/* Routing logic for each link */}
            {text === 'About Us' ? (
              <Link to="/applications" className="navbar-link">
                {text}
              </Link>
            ) : text === 'Featured' ? (
              <Link to="/status" className="navbar-link">
                {text}
              </Link>
            ) : text === 'Testimonials' ? (
              <Link to="/inquiries" className="navbar-link">
                {text}
              </Link>
            ) : (
              <a href={`#${text.toLowerCase().replace(' ', '')}`} className="navbar-link">
                {text}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

export default Navbar;
