// Logout.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');

    // After delay, redirect
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="Logout-container">
      <h2 className="Logout-message">You have been logged out.</h2>
      <p className="Logout-redirect">Redirecting to login...</p>
    </div>
  );
}
