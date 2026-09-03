import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <header className="navigation">
      <nav className="nav-inner">
        <div className="nav-brand">
          <h1>
            <a href="/" aria-label="ZONOMO, Digital Design Studio">ZONOMO</a>
          </h1>
        </div>
        <div className="nav-desc">DIGITAL STUDIO</div>
        <div className="nav-links">
          <a href="/#work" className="nav-link">SERVICES</a>
          <a href="/#platform" className="nav-link">PLATFORM</a>
          <Link to="/about-founders" className="nav-link">ABOUT FOUNDERS</Link>
          <a href="/#contact" className="nav-link">CONTACT</a>
        </div>
        <div className="nav-social">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="nav-link">TWITTER</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="nav-link">INSTAGRAM</a>
        </div>
        <div className="nav-location">DELHI NCR</div>
      </nav>
    </header>
  );
};

export default Navigation;
