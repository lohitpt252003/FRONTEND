// Header.jsx
import { Link } from 'react-router-dom';
import Clock from './Clock';


import './Header.css';

function Header() {
  return (
    <nav className="Header-container">
      <div className="Header-logo"><Link to="/index" id='INDEX_URL'>⚡ Coding Arena</Link></div>
      <Clock />
      <ul className="Header-links">
        <li><Link to="/index">🏠 Home</Link></li>
        <li><Link to="/problems">🧩 Problems</Link></li>
        <li><Link to="/submit">📤 Submit</Link></li>
        <li><Link to="/contests">🏆 Contests</Link></li>
        <li><Link to="/submissions">📜 Submissions</Link></li>
        <li><Link to="/logout">🔐 Logout</Link></li>
      </ul>
    </nav>
  );
}

export default Header;
