import React from 'react';
import { Link } from 'react-router-dom';
import WelcomeChart from '../components/welcomeplot.js';
import './styles/welcome.css';

const Welcome = ({ snippets = [] }) => {
  return (
    <div className="welcome-container">
      <h1>Welcome to Code Snippets Manager</h1>
      <p>Organize and manage your code snippets efficiently</p>
      
      <div className="chart-container">
        <WelcomeChart snippets={snippets} />
        <div className="chart-info">
          {snippets.length > 0 ? (
            <p>You have {snippets.length} total snippets</p>
          ) : (
            <p>Get started by creating your first snippet!</p>
          )}
        </div>
      </div>
      
      <div className="welcome-actions">
        <Link to="/snippets" className="btn primary">
          View All Snippets
        </Link>
        <Link to="/create" className="btn secondary">
          Create New Snippet
        </Link>
      </div>
    </div>
  );
};

export default Welcome;