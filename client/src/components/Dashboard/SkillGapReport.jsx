import React, { useState } from 'react';
import { compareSkills } from '../../api/skill';
import './Dashboard.css';

export default function SkillGapReport({ token, user }) {
  const [alumniList, setAlumniList] = useState('');
  const [report, setReport] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const alumniArr = JSON.parse(alumniList);
      const { data } = await compareSkills({ student: user, alumniList: alumniArr }, token);
      setReport(data);
    } catch {
      setReport({ error: 'Invalid alumni list (must be JSON array)' });
    }
  };

  return (
    <div className="dashboard-card dashboard-skillgap">
      <h3>Skill Gap Analysis</h3>
      <form className="dashboard-form" onSubmit={handleSubmit}>
        <textarea
          className="dashboard-textarea"
          placeholder='Paste alumni profiles as JSON array'
          value={alumniList}
          onChange={e => setAlumniList(e.target.value)}
          rows={4}
        />
        <button className="dashboard-btn" type="submit">Compare</button>
      </form>
      {report && (
        <div className="dashboard-report">
          {report.error ? (
            <div className="dashboard-error">{report.error}</div>
          ) : (
            <>
              <div><b>Missing Skills:</b> {report.missingSkills.join(', ')}</div>
              <div><b>Missing Certifications:</b> {report.missingCerts.join(', ')}</div>
              <div><b>Suggestions:</b> {report.suggestedActions.join(', ')}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
} 