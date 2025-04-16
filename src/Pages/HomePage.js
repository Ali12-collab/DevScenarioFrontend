// src/Pages/HomePage.js
import React from 'react';
import '../Styling/HomePage.css'; // Import custom landing page styles

const HomePage = () => (
  <section className="landing-page">
    <div className="landing-content">
      <h1 className="landing-title">Welcome</h1>
      <p className="landing-description">
        This is a website for efficient and intuitive database management.
      </p>
    </div>
  </section>
);

export default HomePage;
