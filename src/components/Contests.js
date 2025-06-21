// Contests.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import './Contests.css';

export default function Contests() {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_BACKEND_IP || 'https://localhost:5000';
    axios.get(`${baseUrl}/contests`)
      .then(res => setContests(res.data))
      .catch(err => console.error('Failed to fetch contests', err));
  }, []);

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
  };

  const formatDuration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  return (
    <div className="Contests-container">
      <Header />
      {/* <label>Search Contest: </label>
      <input placeholder='Contest id or Contest title'></input>
      <button>Search</button> */}
      <h2 className="Contests-title">Available Contests</h2>
      <ul className="Contests-list">
        {contests.map((c, index) => {
          const status = getContestStatus(c.start_time, c.end_time);
          return (
            <li key={c.id} className="Contests-item">
              <Link to={`/contest/${c.id}`} className="Contests-link">
                {index + 1}. {c.title}
              </Link>
              
              <span className="Contests-time">
                {new Date(c.start_time).toLocaleString()} → {new Date(c.end_time).toLocaleString()}
              </span>
              <div className="Contests-status" style={{ color: status.color }}>
                {status.status} — {status.timeText}
              </div>
            </li>)
        })}
      </ul>
    </div>
  );
}
