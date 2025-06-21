// ProblemList.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import './ProblemList.css';

export default function ProblemList() {
  const [userId, setUserId] = useState(-1);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const storedId = localStorage.getItem('user_id');
    if (storedId) {
      setUserId(parseInt(storedId, 10));
    } else {
      window.location.href = '/';
      return;
    }

    const baseUrl = process.env.REACT_APP_BACKEND_IP || 'http://localhost:5000';
    axios
      .get(`${baseUrl}/problems`)
      .then(res => setProblems(res.data))
      .catch(err => console.error('Failed to fetch problems', err));
  }, []);

  return (
    <div className="ProblemList-container">
      <Header />
      {/* <label>Search problem: </label>
      <input placeholder='Problem id or Problem title'></input>
      <button>Search</button> */}
      <h2 className="ProblemList-title">🧩 All Problems</h2>
      <ul className="ProblemList-list">
        {problems.map((p, index) => (
          <li key={p.id} className="ProblemList-item">
            <Link to={`/problem/${p.id}`} className="ProblemList-link">
              {index + 1}. {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
