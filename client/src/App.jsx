import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AuthModal from './components/Auth/AuthModal';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import AlumniDashboard from './components/Dashboard/AlumniDashboard';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const navigate = useNavigate();

  const handleLogin = (user, token) => {
    setUser(user);
    setToken(token);
    setShowAuth(false);
    navigate('/dashboard');
  };
  const handleSignup = (user, token) => {
    setUser(user);
    setToken(token);
    setShowAuth(false);
    navigate('/dashboard');
  };

  return (
    <>
      <Navbar />
      <AuthModal
        open={showAuth}
        onClose={() => setShowAuth(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
        initialMode={authMode}
      />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login setUser={setUser} setToken={setToken} />} />
        <Route path="/signup" element={<Signup setUser={setUser} setToken={setToken} />} />
        <Route path="/dashboard" element={
          !user ? <Login setUser={setUser} setToken={setToken} /> :
            user.role === 'student' ? (
              <StudentDashboard user={user} token={token} />
            ) : user.role === 'alumni' ? (
              <AlumniDashboard user={user} token={token} />
            ) : (
              <div>Unknown role</div>
            )
        } />
      </Routes>
    </>
  );
}

export default App;
