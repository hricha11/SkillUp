import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AuthModal from './components/Auth/AuthModal';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import AlumniDashboard from './components/Dashboard/AlumniDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleLogin = (user, token) => {
    setUser(user);
    setToken(token);
    setShowAuth(false);
  };
  const handleSignup = (user, token) => {
    setUser(user);
    setToken(token);
    setShowAuth(false);
  };

  return (
    <>
      <Navbar
        onLoginClick={() => { setShowAuth(true); setAuthMode('login'); }}
        onSignupClick={() => { setShowAuth(true); setAuthMode('signup'); }}
      />
      <Hero />
      <AuthModal
        open={showAuth}
        onClose={() => setShowAuth(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
        initialMode={authMode}
      />
      {!user ? null : user.role === 'student' ? (
        <StudentDashboard user={user} token={token} />
      ) : user.role === 'alumni' ? (
        <AlumniDashboard user={user} token={token} />
      ) : (
        <div>Unknown role</div>
      )}
    </>
  );
}

export default App;
