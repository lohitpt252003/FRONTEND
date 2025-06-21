// SubmitCode.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import './SubmitCode.css';

export default function SubmitCode() {
  const [problemId, setProblemId] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [response, setResponse] = useState('');
  const [problems, setProblems] = useState([]);
  const [userId, setUserId] = useState(-1);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const storedId = localStorage.getItem('user_id');
    if (storedId) {
      setUserId(parseInt(storedId, 10));
    } else {
      window.location.href = '/';
      return;
    }

    const baseUrl = process.env.REACT_APP_BACKEND_IP || 'http://localhost:5000';
    axios.get(`${baseUrl}/problems`)
      .then(res => setProblems(res.data))
      .catch(err => console.error('Failed to fetch problems', err));
  }, []);

  const handleSubmit = async () => {
    setResponse('Solution submitted, please wait for the result...');
    try {
      const baseUrl = process.env.REACT_APP_BACKEND_IP || 'http://localhost:5000';
      const res = await axios.post(`${baseUrl}/submit`, {
        problem_id: problemId,
        lang: language,
        code: code,
        user_id: userId
      });
      setResponse(res.data.message || 'Submitted successfully!');
      setLogs(res.data.logs || []);
    } catch (err) {
      setResponse('Error submitting code: ' + err.message);
    }
  };

  return (
    <div className="SubmitCode-container">
      <Header />
      <Link to="/index" className="SubmitCode-back">← Back to Home</Link>
      <h2 className="SubmitCode-title">Submit Code</h2>

      <div className="SubmitCode-problemlist">
        <strong>Available Problems:</strong>
        <ul>
          {problems.map(prob => (
            <li key={prob.id} className="SubmitCode-problemitem">
              <span><strong>{prob.id}</strong>: {prob.title}</span>
              <button onClick={() => setProblemId(prob.id)}>Use this</button>
            </li>
          ))}
        </ul>
      </div>

      <hr className="SubmitCode-separator" />

      <label className="SubmitCode-label">Problem ID:</label>
      <input
        type="text"
        value={problemId}
        onChange={e => setProblemId(e.target.value)}
        className="SubmitCode-input"
      />

      <label className="SubmitCode-label">Language:</label>
      <select
        value={language}
        onChange={e => setLanguage(e.target.value)}
        className="SubmitCode-select"
      >
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
      </select>

      <label className="SubmitCode-label">Code:</label>
      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        rows="20"
        placeholder="Write your code here..."
        className="SubmitCode-textarea"
      />

      <button onClick={handleSubmit} className="SubmitCode-button">
        Submit
      </button>

      {response && <p className="SubmitCode-response">{response}</p>}

      {logs.length > 0 && (
        <div className="SubmitCode-logs">
          <h3>Testcase Results</h3>
          <ul>
            {logs.map((log, idx) => (
              <li key={idx} className="SubmitCode-logitem">
                <strong>Testcase {log.testcase}</strong><br />
                <em>Input:</em> <pre>{log.input}</pre>
                <em>Expected:</em> <pre>{log.expected}</pre>
                <em>Output:</em> <pre>{log.output}</pre>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
