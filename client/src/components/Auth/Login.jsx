import React, { useState } from 'react';
import { login } from '../../api/auth';
import './AuthForm.css';

export default function Login({ setUser, setToken }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await login({ ...form, role });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleForgotPassword = e => {
    e.preventDefault();
    alert('Forgot password functionality coming soon!');
  };

  return (
    <div className="auth-card-centered">
      <div className="role-tabs-modern">
        <button
          type="button"
          className={role === 'student' ? 'active' : ''}
          onClick={() => setRole('student')}
        >
          Student
        </button>
        <button
          type="button"
          className={role === 'alumni' ? 'active' : ''}
          onClick={() => setRole('alumni')}
        >
          Alumni
        </button>
      </div>
      <div className="role-tabs-divider" />
      <form className="auth-form-modern" onSubmit={handleSubmit}>
        <h2 className="auth-title-modern">Sign in to your account</h2>
        {error && <div className="auth-error">{error}</div>}
        <label>Email address</label>
        <input name="email" type="email" placeholder="Email address" onChange={handleChange} required />
        <label>Password</label>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <div className="forgot-password-row">
          <div></div>
          <a href="#" className="forgot-password-link" onClick={handleForgotPassword}>Forgot your password?</a>
        </div>
        <button className="auth-btn-modern" type="submit">Sign in</button>
      </form>
    </div>
  );
} 