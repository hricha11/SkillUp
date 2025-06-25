import React, { useState } from 'react';
import { login } from '../../api/auth';
import './AuthForm.css';

export default function Login({ setUser, setToken }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await login(form);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Login</h2>
        {error && <div className="auth-error">{error}</div>}
        <label>Email</label>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <label>Password</label>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button className="auth-btn" type="submit">Login</button>
      </form>
    </div>
  );
} 