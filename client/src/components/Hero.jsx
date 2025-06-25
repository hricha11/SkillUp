import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Connecting Students <br />With Mentors</h1>
        <p>
          Makes it effortless for graduates to give back,<br />
          helps current students find mentors and career guidance,<br />
          and lets colleges nurture a lifelong network.
        </p>
        <button className="hero-btn">Get Started</button>
        <div className="hero-stats">
          <div>
            <h3>17,000+</h3>
            <span>Engaged Alumni</span>
          </div>
          <div>
            <h3>120+</h3>
            <span>Mentorship Matches <br/> per month</span>
          </div>
          <div>
            <h3>40+</h3>
            <span>Collages connected</span>
          </div>
        </div>
      </div>
      <div className="hero-images">
        <img src="/assets/img1.webp" alt="Student 1" className="hero-img hero-img-1" />
      </div>
    </section>
  );
} 