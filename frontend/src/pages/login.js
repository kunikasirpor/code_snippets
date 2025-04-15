import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("isLoggedIn", "true");

        // Only store non-sensitive data
        const { id, username } = response.data.user;
        localStorage.setItem("user", JSON.stringify({ id, username }));

        navigate("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleLogin} autoComplete="off">
          <input
            className="login-input"
            type="text"
            name="username"
            autoComplete="new-username"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            className="login-input"
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="login-button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
