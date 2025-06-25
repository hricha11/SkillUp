import React, { useEffect, useState } from 'react';
import { getUser } from '../../api/user';
import AlumniSearch from './AlumniSearch';
import MentorshipRequest from './MentorshipRequest';
import SkillGapReport from './SkillGapReport';
import './Dashboard.css';

export default function StudentDashboard({ user, token }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getUser(user._id, token).then(res => setProfile(res.data));
  }, [user, token]);

  if (!profile) return <div className="dashboard-loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Welcome, {profile.name}</h2>
        <div className="dashboard-section">
          <h3>Your Profile</h3>
          <div><b>Email:</b> {profile.email}</div>
          <div><b>Graduation Year:</b> {profile.gradYear}</div>
          <div><b>Company:</b> {profile.company}</div>
          <div><b>Skills:</b> {profile.skills.join(', ')}</div>
          <div><b>Certifications:</b> {profile.certifications.join(', ')}</div>
        </div>
      </div>
      <div className="dashboard-row">
        <AlumniSearch token={token} />
        <MentorshipRequest token={token} user={user} />
      </div>
      <SkillGapReport token={token} user={profile} />
    </div>
  );
} 