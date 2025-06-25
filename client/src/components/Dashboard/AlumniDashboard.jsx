import React, { useEffect, useState } from 'react';
import { getUser, updateUser } from '../../api/user';
import './Dashboard.css';

export default function AlumniDashboard({ user, token }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getUser(user._id, token).then(res => setProfile(res.data));
  }, [user, token]);

  const toggleMentorship = async () => {
    const updated = await updateUser(user._id, { mentorshipAvailable: !profile.mentorshipAvailable }, token);
    setProfile(updated.data);
  };

  if (!profile) return <div className="dashboard-loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Welcome, {profile.name}</h2>
        <div className="dashboard-section">
          <h3>Your Profile</h3>
          <div><b>Email:</b> {profile.email}</div>
          <div><b>Company:</b> {profile.company}</div>
          <div><b>Skills:</b> {profile.skills.join(', ')}</div>
          <div><b>Certifications:</b> {profile.certifications.join(', ')}</div>
          <div className="mentorship-toggle">
            <b>Mentorship Available:</b> {profile.mentorshipAvailable ? 'Yes' : 'No'}
            <button className="dashboard-btn" onClick={toggleMentorship}>
              {profile.mentorshipAvailable ? 'Disable' : 'Enable'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 