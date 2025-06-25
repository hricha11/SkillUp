import React, { useState } from 'react';
import { requestMentorship } from '../../api/mentorship';
import './Dashboard.css';

export default function MentorshipRequest({ token, user }) {
  const [alumniId, setAlumniId] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await requestMentorship({ alumniId, message }, token);
      setStatus('Request sent!');
    } catch (err) {
      setStatus('Failed to send request');
    }
  };

  return (
    <div className="dashboard-card dashboard-mentorship">
      <h3>Request Mentorship</h3>
      <form className="dashboard-form" onSubmit={handleSubmit}>
        <div className="dashboard-input-group">
          <input placeholder="Alumni ID" value={alumniId} onChange={e => setAlumniId(e.target.value)} required />
          <input placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
        </div>
        <button className="dashboard-btn" type="submit">Send Request</button>
      </form>
      {status && <div className="dashboard-status">{status}</div>}
    </div>
  );
} 