import React, { useState } from 'react';
import { searchAlumni } from '../../api/user';
import './Dashboard.css';

export default function AlumniSearch({ token }) {
  const [query, setQuery] = useState({ skill: '', company: '', location: '' });
  const [results, setResults] = useState([]);

  const handleChange = e => setQuery({ ...query, [e.target.name]: e.target.value });

  const handleSearch = async e => {
    e.preventDefault();
    const { data } = await searchAlumni(query, token);
    setResults(data);
  };

  return (
    <div className="dashboard-card dashboard-search">
      <h3>Search Alumni</h3>
      <form className="dashboard-form" onSubmit={handleSearch}>
        <div className="dashboard-input-group">
          <input name="skill" placeholder="Skill" onChange={handleChange} />
          <input name="company" placeholder="Company" onChange={handleChange} />
          <input name="location" placeholder="Location" onChange={handleChange} />
        </div>
        <button className="dashboard-btn" type="submit">Search</button>
      </form>
      <ul className="dashboard-list">
        {results.map(alumni => (
          <li key={alumni._id} className="dashboard-list-item">
            <b>{alumni.name}</b> - {alumni.company} - {alumni.skills.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
} 