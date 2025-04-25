// src/Components/TestimonialsSection.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import '../Styling/Testimonials.css';

import testimonial1 from '../Assets/black.jpg';
import testimonial2 from '../Assets/david.jpg';
import testimonial3 from '../Assets/ginger.jpg';
import testimonial4 from '../Assets/blonde.jpg';
import testimonial5 from '../Assets/indian.jpg';
import testimonial6 from '../Assets/LinkedIn-profile-photos-in-Chicago-Rayyan-5772_1200.jpg';

const testimonials = [
    {
      img: testimonial1,
      text: "The application tracking system has been a game-changer for our team. Submissions are now streamlined, and response times have improved dramatically.",
      name: "David K. – Municipality Officer",
    },
    {
      img: testimonial2,
      text: "It’s incredibly user-friendly. Even our less tech-savvy staff are able to manage applications and inquiries without needing extra support.",
      name: " Daniel J. – Office Manager",
    },
    {
      img: testimonial3,
      text: "The inquiry integration has helped us stay responsive and organized. It’s efficient, reliable, and perfectly suited for our needs.",
      name: "Omar F. – Government Clerk",
    },
    {
      img: testimonial4,
      text: "Being able to view and update applications in one place has saved us hours every week. Very well designed!",
      name: "Amina G.  – Applications Reviewer",
    },
    {
      img: testimonial5,
      text: "Clear UI and smooth performance. The system handles large volumes of data effortlessly and makes monitoring easy.",
      name: "Christian N. – Case Specialist",
    },
    {
      img: testimonial6,
      text: "This tool helped us track citizen requests more effectively and reduced miscommunication between departments.",
      name: "Dimitri A. – Public Services Liaison",
    },
  ];
  

const TestimonialsSection = () => {
  return (
    <>
      <div className="testimonials-heading">
        <h3>
          <span className="line-one">Testimonials –</span><br />
          <span className="line-two">What They Say</span>
        </h3>
      </div>

      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="testimonials-swiper-wrapper">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={2}
              slidesPerView={4}
              centeredSlides={true}
              loop={true}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              breakpoints={{
                0: { slidesPerView: 1.1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2.5 },
                1280: { slidesPerView: 3 },
              }}
            >
              {testimonials.map((t, index) => (
                <SwiperSlide key={index}>
                  <div className="testimonial-box">
                    <img src={t.img} alt={`Testimonial ${index + 1}`} className="testimonial-img" />
                    <p>{t.text}</p>
                    <h5>{t.name}</h5>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
