import React, { useState } from 'react';
import { signup } from '../../api/auth'; // You should create this API call
import './AuthForm.css';

export default function SignUp({ setUser, setToken }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    gradYear: '',
    company: '',
    skills: '',
    certifications: ''
  });
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await signup({ ...form, role });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
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
        <h2 className="auth-title-modern">Create your account</h2>
        {error && <div className="auth-error">{error}</div>}
        <label>Name</label>
        <input name="name" type="text" placeholder="Name" onChange={handleChange} required />
        <label>Email address</label>
        <input name="email" type="email" placeholder="Email address" onChange={handleChange} required />
        <label>Password</label>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <label>Graduation Year</label>
        <input name="gradYear" type="number" placeholder="Graduation Year" onChange={handleChange} />
        <label>Company</label>
        <input name="company" type="text" placeholder="Company" onChange={handleChange} />
        <label>Skills (comma separated)</label>
        <input name="skills" type="text" placeholder="Skills" onChange={handleChange} />
        <label>Certifications (comma separated)</label>
        <input name="certifications" type="text" placeholder="Certifications" onChange={handleChange} />
        <button className="auth-btn-modern" type="submit">Sign up</button>
      </form>
    </div>
  );
}
