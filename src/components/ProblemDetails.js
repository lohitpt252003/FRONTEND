// ProblemDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import './ProblemDetails.css';

export default function ProblemDetails() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_BACKEND_IP || 'https://localhost:5000';
    axios.get(`${baseUrl}/problem/${id}`)
      .then(res => {
        setProblem(res.data);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load problem.');
        setProblem(null);
      });
  }, [id]);

  if (error) return <p className="ProblemDetails-error">{error}</p>;
  if (!problem) return <p className="ProblemDetails-loading">Loading...</p>;

  return (
    <div className="ProblemDetails-container">
      <Header />
      <Link to="/index" className="ProblemDetails-back">← Back to List</Link>
      <h2 className="ProblemDetails-title">{problem.title}</h2>

      <div className="ProblemDetails-section">
        <p>
          <strong className="ProblemDetails-label">Statement:</strong><br />
          {problem.statement.split('\n').map((line, i) => (
            <span key={i} className="ProblemDetails-line">{line}<br/></span>
          ))}
        </p>
      </div>

      <div className="ProblemDetails-section">
        <p>
          <strong className="ProblemDetails-label">Input Format:</strong><br />
          {problem.input_format.split('\n').map((line, i) => (
            <span key={i} className="ProblemDetails-line">{line}<br/></span>
          ))}
        </p>
      </div>

      <div className="ProblemDetails-section">
        <p>
          <strong className="ProblemDetails-label">Output Format:</strong><br />
          {problem.output_format.split('\n').map((line, i) => (
            <span key={i} className="ProblemDetails-line">{line}<br/></span>
          ))}
        </p>
      </div>

      <div className="ProblemDetails-section">
        <p><strong className="ProblemDetails-label">Constraints:</strong></p>
        <ul className="ProblemDetails-list">
          {problem.constraints &&
            Object.entries(problem.constraints).map(([key], idx) => (
              <li key={idx} className="ProblemDetails-item">{key}</li>
          ))}
        </ul>
      </div>

      <div className="ProblemDetails-section">
        <p>
          <strong className="ProblemDetails-label">Time Limit:</strong> {problem.time_limit}
        </p>
      </div>

      <div className="ProblemDetails-section">
        <p><strong className="ProblemDetails-label">Sample Testcases:</strong></p>
        {problem.sample_testcases.map((tc, i) => (
          <div key={i} className="ProblemDetails-testcase">
            <pre className="ProblemDetails-pre">
              <strong className="ProblemDetails-label">Input:</strong><br />
              {tc.input.split('\n').map((l, j) => <span key={j}>{l}<br/></span>)}
            </pre>
            <pre className="ProblemDetails-pre">
              <strong className="ProblemDetails-label">Output:</strong><br />
              {tc.output.split('\n').map((l, j) => <span key={j}>{l}<br/></span>)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
