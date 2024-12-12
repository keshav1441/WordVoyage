import React from 'react';
import { Typography } from '@mui/material';  // Import Material UI Typography
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/Feature.css'; // Custom CSS file for styles

// List of Carousel Items (5 items added)
const carouselItems = [
  {
    title: "Breaking Into Product Design",
    description: "Advice from Untitled Founder, Frankie.",
    image: "https://via.placeholder.com/1600x800",
  },
  {
    title: "How to Build Your API Stack",
    description: "Discover the tools and strategies for success.",
    image: "https://via.placeholder.com/1600x800",
  },
  {
    title: "Migrating to Linear 101",
    description: "A guide to smoother transitions in your workflow.",
    image: "https://via.placeholder.com/1600x800",
  },
  {
    title: "The Future of AI in Web Development",
    description: "Exploring AI-driven tools and their impact on web design.",
    image: "https://via.placeholder.com/1600x800",
  },
  {
    title: "Mastering Cloud Computing",
    description: "Learn the best practices for cloud architecture.",
    image: "https://via.placeholder.com/1600x800",
  },
];

const Feature = () => {
  return (
    <div className="feature-wrapper">
      <div id="featureCarousel" className="carousel slide" data-bs-ride="carousel">
        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#featureCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Carousel Inner */}
        <div className="carousel-inner">
          {carouselItems.map((item, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img src={item.image} className="d-block w-100 carousel-img" alt={`Featured Blog ${index + 1}`} />
              <div className="carousel-caption d-none d-md-block">
                <div className="featured-badge text-white rounded-full ring-2 ring-white py-1 text-sm left-badge">Featured</div>
                <Typography variant="h5" className="text-white mt-3">{item.title}</Typography>
                <Typography variant="body1" className="text-white">{item.description}</Typography>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button className="carousel-control-next" type="button" data-bs-target="#featureCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Feature;
