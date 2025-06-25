import React from 'react';
import './Navbar.css';

export default function Navbar({ onLoginClick, onSignupClick }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="navbar-title">skillup</span>
      </div>
      <div className="navbar-links">
        <a href="#">Alumni</a>
        <a href="#">Student</a>
        <a href="#">Contact</a>
        <button className="navbar-login" onClick={onLoginClick}>Login</button>
        <button className="navbar-signup" onClick={onSignupClick}>Sign up</button>
      </div>
    </nav>
  );
} 