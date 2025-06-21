// LandingPage.jsx

import React, { useEffect, useState } from 'react';
import Header from './Header';
import './LandingPage.css';

export default function LandingPage() {
  const [userId, setUserId] = useState(-1);
  const [user, setUser] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedId   = localStorage.getItem('user_id');
    if (!storedUser) {
      window.location.href = '/';
      return;
    }
    setUser(storedUser);
    setUserId(parseInt(storedId, 10));
  }, []);

  return (
    <div className="LandingPage-container">
      <Header />
      <div className="LandingPage-content">
        <h1 className="LandingPage-welcome">
          🚀 Welcome, {user}, to Coding Arena 101
        </h1>
        <p className="LandingPage-tagline">
          Sharpen your skills. Compete with the best. Learn every day.
        </p>
        <div className="LandingPage-animationbg" />
      </div>
    </div>
  );
}
