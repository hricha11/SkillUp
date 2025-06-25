import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import './AuthModal.css';

export default function AuthModal({ open, onClose, onLogin, onSignup, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);

  const handleLogin = (user, token) => {
    onLogin(user, token);
    setMode('login');
  };
  const handleSignup = (user, token) => {
    onSignup(user, token);
    setMode('login');
  };

  return !open ? null : (
    <div className="authmodal-overlay" onClick={onClose}>
      <div className="authmodal-content" onClick={e => e.stopPropagation()}>
        <div className="authmodal-left">
          <div className="authmodal-brand">
            <img src="/logo.svg" alt="skillup logo" className="authmodal-logo" />
            <div className="authmodal-brand-title">skillup</div>
          </div>
          <div className="authmodal-headline">University Recruiting Platform</div>
          <div className="authmodal-sub">Campus Recruitment made easy</div>
        </div>
        <div className="authmodal-right">
          <button className="authmodal-close" onClick={onClose}>&times;</button>
          <div className="authmodal-form-logo">
            <img src="/logo.svg" alt="skillup logo" />
            <span>skillup</span>
          </div>
          {mode === 'login' ? (
            <>
              <Login setUser={user => handleLogin(user)} setToken={token => handleLogin(undefined, token)} />
              <div className="authmodal-links">
                <a href="#" className="authmodal-link">Forgot password?</a>
                <span>|</span>
                <button className="authmodal-link-btn" onClick={() => setMode('signup')}>Sign Up</button>
                <span>|</span>
                <a href="#" className="authmodal-link">Student Help</a>
              </div>
            </>
          ) : (
            <>
              <Signup setUser={user => handleSignup(user)} setToken={token => handleSignup(undefined, token)} />
              <div className="authmodal-links">
                <button className="authmodal-link-btn" onClick={() => setMode('login')}>Back to Login</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 