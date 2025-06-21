// Submissions.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import './Submissions.css';

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedId   = localStorage.getItem('user_id');

    if (!storedUser) {
      window.location.href = '/';
      return;
    }

    setUserId(storedId);
    const baseUrl = process.env.REACT_APP_BACKEND_IP || 'https://localhost:5000';
    axios
      .get(`${baseUrl}/submissions/${storedId}`)
      .then(res => setSubmissions(res.data))
      .catch(err => console.error('Failed to fetch submissions', err));
  }, []);

  return (
    <div className="Submissions-container">
      <Header />
      <Link to="/index" className="Submissions-back">← Back to Home</Link>
      <h2 className="Submissions-title">All Submissions</h2>

      {submissions.length === 0 ? (
        <p className="Submissions-nodata">No submissions found.</p>
      ) : (
        <div className="Submissions-grid">
          {submissions.map((sub, idx) => (
            <div key={idx} className="Submissions-card">
              <div className="Submissions-row">
                <span className="Submissions-label">ID:</span> {sub.submission_id}
              </div>
              <div className="Submissions-row">
                <span className="Submissions-label">Problem:</span> {sub.problem_id}
              </div>
              <div className={`Submissions-status status-${sub.status.replace(/\s+/g, '')}`}>
                {sub.status}
              </div>
              <div className="Submissions-row">
                <span className="Submissions-label">Lang:</span> {sub.language}
              </div>
              <pre className="Submissions-code">{sub.code}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
