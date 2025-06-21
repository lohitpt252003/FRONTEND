// Login.jsx

import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const url = process.env.REACT_APP_BACKEND_IP || "https://localhost:5000";
      const res = await fetch(`${url}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("Login successful!");
        localStorage.setItem("user", username);
        localStorage.setItem("user_id", data.user_id);
        window.location.href = "/index";
      } else {
        setMessage(data.error || "Login failed.");
      }
    } catch (err) {
      setMessage(`Server error: ${err}`);
    }
  };

  return (
    <div className="Login-container">
      <h2 className="Login-title">Login</h2>
      <input
        type="text"
        className="Login-input"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="Login-input"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className="Login-button" onClick={handleLogin}>
        Login
      </button>
      {message && <p className="Login-message">{message}</p>}
    </div>
  );
}
