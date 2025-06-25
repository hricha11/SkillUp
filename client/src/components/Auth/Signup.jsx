import React, { useState } from 'react';
import { signup } from '../../api/auth'; // You should create this API call
import './AuthForm.css';

export default function SignUp({ setUser, setToken }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    gradYear: '',
    company: '',
    skills: '',
    certifications: ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await signup(form);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Sign Up</h2>
        {error && <div className="auth-error">{error}</div>}
        
        <label>Name</label>
        <input name="name" type="text" placeholder="Name" onChange={handleChange} required />

        <label>Email</label>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />

        <label>Password</label>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

        <label>Role</label>
        <select name="role" onChange={handleChange} value={form.role}>
          <option value="student">Student</option>
          <option value="alumni">Alumni</option>
        </select>

        <label>Graduation Year</label>
        <input name="gradYear" type="number" placeholder="Graduation Year" onChange={handleChange} />

        <label>Company</label>
        <input name="company" type="text" placeholder="Company" onChange={handleChange} />

        <label>Skills (comma separated)</label>
        <input name="skills" type="text" placeholder="Skills" onChange={handleChange} />

        <label>Certifications (comma separated)</label>
        <input name="certifications" type="text" placeholder="Certifications" onChange={handleChange} />

        <button className="auth-btn" type="submit">Signup</button>
      </form>
    </div>
  );
}
