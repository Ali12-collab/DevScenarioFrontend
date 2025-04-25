// src/Pages/HomePage.js
import React from 'react';
import '../Styling/HomePage.css';
import TestimonialsSection from '../Components/TestimonialsSection';
import Footer from '../Components/Footer';


// ✅ Import icons
import createIcon from '../Assets/create-svgrepo-com.svg';
import editIcon from '../Assets/edit-2-svgrepo-com.svg';
import deleteIcon from '../Assets/delete-svgrepo-com.svg';
import searchIcon from '../Assets/search-square-svgrepo-com.svg';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="landing-page">
        <div className="landing-content">
          <h1 className="landing-title">Welcome</h1>
          <p className="landing-description">
          Modernizing application and inquiry management with intuitive, secure, and scalable solutions.
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section id="our-story" className="about-section">
        <div className="about-container">
          <div className="about-text">
            <h4 className="about-us-title">About Us</h4>
            <h2>Our Story   </h2>
            <p>
            This platform was built as a focused solution for managing government applications and inquiry tracking — combining clarity in the UI with precision in data operations.

Developed as a modern Single Page Application using React and powered by a .NET Core API with Entity Framework, the system enables seamless interaction with Applications, Inquiries, and Status Levels. From responsive interfaces to RESTful endpoints, every layer is designed with usability, scalability, and maintainability in mind.


            </p>
          </div>

          <div className="about-cards">
            <div className="info-box">
              <div className="icon-frame">
                <img src={createIcon} alt="Create" />
              </div>
              <h5>Create</h5>
              <p>Submit new applications or add inquiries linked to specific records. Capture key data efficiently with form validation to ensure data integrity and completeness.</p>
            </div>
            <div className="info-box">
              <div className="icon-frame">
                <img src={editIcon} alt="Edit" />
              </div>
              <h5>Edit</h5>
              <p>Update existing applications or inquiries with accurate and up-to-date information. Easily modify fields while preserving the record history and consistency.</p>
            </div>
            <div className="info-box">
              <div className="icon-frame">
                <img src={searchIcon} alt="Search" />
              </div>
              <h5>Search</h5>
              <p>Quickly locate specific applications or inquiries using dynamic filters and keyword-based search. Enhances usability and saves time in large datasets.</p>
            </div>
            <div className="info-box">
              <div className="icon-frame">
                <img src={deleteIcon} alt="Delete" />
              </div>
              <h5>Delete</h5>
              <p>Remove outdated or incorrect applications/inquiries with confirmation prompts to avoid accidental deletions. Helps maintain a clean and reliable data set.</p>
            </div>
          </div>
        </div>
      </section>


      <TestimonialsSection />

      <Footer />

      

      

      
    </>
  );
};

export default HomePage;
