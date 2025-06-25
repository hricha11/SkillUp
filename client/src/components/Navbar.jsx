import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-title">skillup</Link>
      </div>
      <div className="navbar-links">
        <Link to="/dashboard">Alumni</Link>
        <Link to="/dashboard">Student</Link>
        <a href="#">Contact</a>
        <Link to="/login" className="navbar-login">Login</Link>
        <Link to="/signup" className="navbar-signup">Sign up</Link>
      </div>
    </nav>
  );
} 