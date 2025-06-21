// ContestDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import './ContestDetails.css';

export default function ContestDetails() {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [statusInfo, setStatusInfo] = useState(null);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_BACKEND_IP || 'https://localhost:5000';
    axios.get(`${baseUrl}/contest/${id}`)
      .then(res => {
        setContest(res.data);
        setStatusInfo(getContestStatus(res.data.start_time, res.data.end_time));
      })
      .catch(err => console.error('Failed to fetch contest', err));
  }, [id]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (contest) {
        setStatusInfo(getContestStatus(contest.start_time, contest.end_time));
      }
    }, 1000); // Update every second
    return () => clearInterval(interval);
  }, [contest]);
  const getContestStatus = (start, end) => {
    const now = new Date();
    const startTime = new Date(start);
    const endTime = new Date(end);

    if (now < startTime) {
      const diff = startTime - now;
      return {
        status: 'Not Started',
        color: 'gray',
        timeText: `Starts in ${formatDuration(diff)}`
      };
    } else if (now >= startTime && now <= endTime) {
      const diff = endTime - now;
      return {
        status: 'Running',
        color: 'green',
        timeText: `Ends in ${formatDuration(diff)}`
      };
    } else {
      return {
        status: 'Over',
        color: 'red',
        timeText: 'Contest Ended'
      };
    }
  }

  const formatDuration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  

  if (!contest) {
    return <p className="ContestDetails-loading">Loading...</p>;
  }

  return (
    <div className="ContestDetails-container">
      <Header />
      <h2 className="ContestDetails-title">{contest.title}</h2>
      <p className="ContestDetails-description">{contest.description}</p>

      <div className="ContestDetails-statusBox" style={{ color: statusInfo?.color }}>
        <strong>Status:</strong> {statusInfo?.status} — {statusInfo?.timeText}
      </div>

      <h3 className="ContestDetails-subheading">Problems:</h3>
      <ul className="ContestDetails-list">
        {contest.problems.map(pid => (
          <li key={pid} className="ContestDetails-item">
            <Link to={`/problem/${pid}`} className="ContestDetails-link">
              Problem {pid}
            </Link>
          </li>
        ))}
      </ul>

      <div className="ContestDetails-times">
        <p>
          <strong className="ContestDetails-label">Start:</strong>{' '}
          {new Date(contest.start_time).toLocaleString()}
        </p>
        <p>
          <strong className="ContestDetails-label">End:</strong>{' '}
          {new Date(contest.end_time).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
