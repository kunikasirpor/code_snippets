import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/sidebar.css';

const Sidebar = ({ toggleDarkMode, darkMode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div 
      className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <div className="sidebar-content">
        <button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? '☰' : '✕'}
        </button>

        <h3>Categories</h3>
        <ul>
          <li><Link to="/snippets">My Snippets</Link></li>
        </ul>
        
        <h3>Create new workspace</h3>
        <ul>
          <li><Link to="/snippet/1">Hello World</Link></li>
          <li><Link to="/snippet/2">Empty Object</Link></li>
          <li><Link to="/snippet/3">User Input</Link></li>
        </ul>

        <div className="sidebar-footer">
          <Link to="/trash" className="trash-link">🗑️ Trash</Link>
          <Link to="/" className="home-link">🏠 Home</Link>
        </div>

        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
