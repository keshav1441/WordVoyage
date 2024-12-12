import React from 'react';
import '../styles/Feature.css'; // Custom CSS file for styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Feature = () => {
  return (
    <div className="feature-wrapper">
      <div id="featureCarousel" className="carousel slide" data-bs-ride="carousel">
        {/* Indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#featureCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#featureCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#featureCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        {/* Carousel Items */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://via.placeholder.com/1200x600"
              className="d-block w-100"
              alt="Featured Blog 1"
            />
            <div className="carousel-caption d-none d-md-block">
              <div className="featured-badge">Featured</div>
              <h5>Breaking Into Product Design</h5>
              <p>Advice from Untitled Founder, Frankie.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://via.placeholder.com/1200x600"
              className="d-block w-100"
              alt="Featured Blog 2"
            />
            <div className="carousel-caption d-none d-md-block">
              <div className="featured-badge">Featured</div>
              <h5>How to Build Your API Stack</h5>
              <p>Discover the tools and strategies for success.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://via.placeholder.com/1200x600"
              className="d-block w-100"
              alt="Featured Blog 3"
            />
            <div className="carousel-caption d-none d-md-block">
              <div className="featured-badge">Featured</div>
              <h5>Migrating to Linear 101</h5>
              <p>A guide to smoother transitions in your workflow.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
